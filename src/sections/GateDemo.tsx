import { useEffect, useMemo, useRef, useState } from 'react'
import { GateRow } from '../components/GateRow.tsx'
import { SignTag } from '../components/SignTag.tsx'
import { WORKSPACE_CONFIG, buildVfs } from '../playground/engine.ts'
import { fence } from '../playground/provenance.ts'
import { buildProposal, configFor, findScenario } from '../playground/scenarios.ts'
import { useGateRunner } from '../playground/useGateRunner.ts'
import { Ledger } from '../playground/ui/Ledger.tsx'
import { ProposalPanel } from '../playground/ui/ProposalPanel.tsx'
import { RedTeam } from '../playground/ui/RedTeam.tsx'
import { RulesPanel } from '../playground/ui/RulesPanel.tsx'
import { ScenarioPicker } from '../playground/ui/ScenarioPicker.tsx'
import { TracePanel } from '../playground/ui/TracePanel.tsx'
import type { Capability, Permission } from '../playground/types.ts'

interface GateDemoProps {
  scenarioId: string
  onScenarioChange: (id: string) => void
}

export function GateDemo({ scenarioId, onScenarioChange }: GateDemoProps) {
  return (
    <section id="gate-demo" className="band band--board" aria-labelledby="demo-title" tabIndex={-1}>
      <div className="wrap">
        <header className="section-head section-head--split">
          <h2 id="demo-title">Send a proposal through the gates</h2>
          <div className="demo__intro">
            <p className="section-head__lead">
              This is the decision path from my computer-use agent, rebuilt as something you can poke. Pick a request,
              change a rule, and watch where it stops and why.
            </p>
            <SignTag tone="yellow">
              Simulation. It re-implements the stage order and policy rules in TypeScript. No model runs here and
              nothing leaves your browser.
            </SignTag>
          </div>
        </header>

        <ScenarioPicker value={scenarioId} onChange={onScenarioChange} />
        <Workbench key={scenarioId} scenarioId={scenarioId} />
      </div>
    </section>
  )
}

function Workbench({ scenarioId }: { scenarioId: string }) {
  const scenario = findScenario(scenarioId)
  const defaults = useMemo(() => configFor(scenario), [scenario])

  const [permissions, setPermissions] = useState(defaults.permissions)
  const [maxActions, setMaxActions] = useState(defaults.maxActions)
  const [actionsUsed, setActionsUsed] = useState(defaults.actionsUsed)
  const [fooled, setFooled] = useState(true)
  const [edit, setEdit] = useState(() =>
    scenario.editable ? String(scenario.proposal.arguments[scenario.editable.argKey] ?? '') : '',
  )

  const config = useMemo(() => ({ permissions, maxActions, actionsUsed }), [permissions, maxActions, actionsUsed])
  const proposal = useMemo(
    () => buildProposal(scenario, { fooled, edit: scenario.editable ? edit : undefined }),
    [scenario, fooled, edit],
  )
  const runner = useGateRunner({ config, proposal, goal: scenario.goal })

  const approveRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    // The next step is the person's, so put focus on it.
    if (runner.waiting) approveRef.current?.focus()
  }, [runner.waiting])

  const fencedObservation = useMemo(() => {
    if (!scenario.observationPath) return undefined
    const root = WORKSPACE_CONFIG.roots[0] ?? ''
    const node = buildVfs().get(`${root}/${scenario.observationPath}`)
    return node?.type === 'file' ? fence(node.content, 'EXTERNAL_CONTENT') : undefined
  }, [scenario])

  const setPermission = (capability: Capability, value: Permission) =>
    setPermissions((prev) => ({ ...prev, [capability]: value }))

  const resetRules = () => {
    setPermissions(defaults.permissions)
    setMaxActions(defaults.maxActions)
    setActionsUsed(defaults.actionsUsed)
  }

  const showLedger = runner.waiting || runner.finished

  return (
    <div className="workbench">
      <div className="demo__pair">
        <ProposalPanel
          scenario={scenario}
          proposal={proposal}
          editValue={edit}
          onEdit={setEdit}
          fooled={fooled}
          onFooled={setFooled}
          fencedObservation={fencedObservation}
        />
        <RulesPanel
          permissions={permissions}
          onPermission={setPermission}
          maxActions={maxActions}
          onMaxActions={setMaxActions}
          actionsUsed={actionsUsed}
          onActionsUsed={setActionsUsed}
          onReset={resetRules}
        />
      </div>

      <div className="demo__run">
        <button type="button" className="chip-btn chip-btn--blue demo__send" onClick={runner.run}>
          {runner.started ? 'Send again' : 'Send through the gates'}
        </button>
        {runner.started && (
          <button type="button" className="chip-btn chip-btn--plain" onClick={runner.reset}>
            Clear
          </button>
        )}
      </div>

      <div className="gantry demo__gantry">
        <div className="gantry__beam" aria-hidden="true" />
        <GateRow stages={runner.trace?.stages} revealed={runner.revealed} variant="demo" />
      </div>

      <div className="demo__lesson">
        <p>
          <strong>What to notice.</strong> {scenario.lesson}
        </p>
        <p className="demo__evidence">Backed in the original by: {scenario.evidence}</p>
      </div>

      <div className="demo__pair demo__pair--trace">
        <TracePanel
          ref={approveRef}
          trace={runner.trace}
          revealed={runner.revealed}
          waiting={runner.waiting}
          finished={runner.finished}
          onDecide={runner.decide}
        />
        <Ledger rows={showLedger ? runner.trace?.ledger : undefined} />
      </div>

      <RedTeam rows={showLedger ? runner.trace?.ledger : undefined} />
    </div>
  )
}
