import { SignGlyph } from '../../components/StateSign.tsx'
import { SCENARIOS } from '../scenarios.ts'

interface ScenarioPickerProps {
  value: string
  onChange: (id: string) => void
}

/** A radio group styled as signs, so arrow keys move between requests and selection is more than colour. */
export function ScenarioPicker({ value, onChange }: ScenarioPickerProps) {
  return (
    <fieldset className="picker">
      <legend className="picker__legend">Choose a request</legend>
      <div className="picker__grid">
        {SCENARIOS.map((scenario) => {
          const selected = scenario.id === value
          return (
            <label key={scenario.id} className="picker__option">
              <input
                type="radio"
                name="scenario"
                value={scenario.id}
                checked={selected}
                onChange={() => onChange(scenario.id)}
              />
              <span className="picker__card sign">
                <span className="picker__title">{scenario.title}</span>
                <span className="picker__blurb">{scenario.blurb}</span>
                {selected && (
                  <span className="picker__selected">
                    <SignGlyph tone="blue" />
                    <span className="visually-hidden">Selected</span>
                  </span>
                )}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
