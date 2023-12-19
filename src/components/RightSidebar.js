import { Slider } from "@mui/material";
import styles from "./RightSidebar.module.scss";
import BasicSelect from "./BasicSelect";

export default function RightSidebar({
  className,
  models,
  setModel,
  model,
  maxTokens,
  setMaxTokens,
  temperature,
  setTemperature,
}) {
  return (
    <div className={className}>
      <BasicSelect
        options={models}
        setValue={setModel}
        value={model}
        title="Model"
      />
      <div className={styles.labelContainer}>
        <h4>Temperature</h4>
        <h4>{temperature}</h4>
      </div>
      <Slider
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        max={2.0}
        step={0.01}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
      <div className={styles.labelContainer}>
        <h4>Maximum Length</h4>
        <h4>{maxTokens}</h4>
      </div>
      <Slider
        value={maxTokens}
        onChange={(e) => setMaxTokens(e.target.value)}
        max={4095}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </div>
  );
}
