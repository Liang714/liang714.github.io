import { useEffect, useMemo, useRef, useState } from 'react'
import { PageHead } from '../components/PageHead.tsx'
import { site } from '../config/site.ts'
import { usePageMeta } from '../hooks/usePageMeta.ts'
import { WORKSPACE_CONFIG, buildVfs } from '../playground/engine.ts'
import { fence } from '../playground/provenance.ts'
import { buildProposal, configFor, findScenario } from '../playground/scenarios.ts'
import { GateRail } from '../playground/ui/GateRail.tsx'
import { Ledger } from '../playground/ui/Ledger.tsx'
import { ProposalPanel } from '../playground/ui/ProposalPanel.tsx'
import { RedTeam } from '../playground/ui/RedTeam.tsx'
import { RulesPanel } from '../playground/ui/RulesPanel.tsx'
import { ScenarioPicker } from '../playground/ui/ScenarioPicker.tsx'
import { TracePanel } from '../playground/ui/TracePanel.tsx'
import { useGateRunner } from '../playground/useGateRunner.ts'
import type { Capability, Permission } from '../playground/types.ts'

/** The request the page opens on: it shows a held request, a computed risk and a waiting approval at once. */
const FIRST_SCENARIO = 'delete-bulk'

const description =
  'The decision path from my computer-use agent, rebuilt as something you can poke. Pick a request, change a rule, and watch where it stops and why.'

export default function GatePage() {
  usePageMeta(`The gate, in full | ${site.name}`, description)
  const [scenarioId, setScenarioId] = useState(FIRST_SCENARIO)

  return (
    <section className="page gate-page" aria-labelledby="gate-title">
      <PageHead
        title="The gate, in full"
        titleId="gate-title"
        lead={description}
        back={{ to: '/work/computer-agent/', label: 'Back to the case study' }}
      >
        <p className="gate-page__note">
          <strong>Simulation.</strong> It re-implements the stage order and policy rules in TypeScript. No model runs here
          and nothing leaves your browser.
        </p>
      </PageHead>

      <ScenarioPicker value={scenarioId} onChange={setScenarioId} />
      <Workbench key={scenarioId} scenarioId={scenarioId} />
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
    setPermissions((previous) => ({ ...previous, [capability]: value }))

  const resetRules = () => {
    setPermissions(defaults.permissions)
    setMaxActions(defaults.maxActions)
    setActionsUsed(defaults.actionsUsed)
  }

  const showLedger = runner.waiting || runner.finished

  return (
    <div className="workbench">
      <div className="workbench__pair">
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

      <div className="workbench__run">
        <button type="button" className="btn" onClick={runner.run}>
          {runner.started ? 'Send again' : 'Send through the gates'}
        </button>
        {runner.started && (
          <button type="button" className="btn-quiet" onClick={runner.reset}>
            Clear
          </button>
        )}
      </div>

      <GateRail stages={runner.trace?.stages} revealed={runner.revealed} />

      <div className="workbench__lesson">
        <p>
          <strong>What to notice.</strong> {scenario.lesson}
        </p>
        <p className="workbench__evidence">Backed in the original by: {scenario.evidence}</p>
      </div>

      <div className="workbench__pair">
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
