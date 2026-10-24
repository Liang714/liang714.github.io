import { SCENARIOS } from '../scenarios.ts'

interface ScenarioPickerProps {
  value: string
  onChange: (id: string) => void
}

/** A radio group set as a list of requests, so arrow keys move between them and selection is more than colour. */
export function ScenarioPicker({ value, onChange }: ScenarioPickerProps) {
  return (
    <fieldset className="picker">
      <legend className="picker__legend">Choose a request</legend>
      <div className="picker__grid">
        {SCENARIOS.map((scenario) => (
          <label key={scenario.id} className="picker__option">
            <input
              type="radio"
              name="scenario"
              value={scenario.id}
              checked={scenario.id === value}
              onChange={() => onChange(scenario.id)}
            />
            <span className="picker__card">
              <span className="picker__title">{scenario.title}</span>
              <span className="picker__blurb">{scenario.blurb}</span>
              {scenario.id === value && <span className="picker__selected">Selected</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
