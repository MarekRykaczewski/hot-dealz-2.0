interface ProgressBarProps {
  stepCompletion: boolean[];
}

const ProgressBar = ({ stepCompletion }: ProgressBarProps) => {
  const totalSteps = stepCompletion.length;
  const completedSteps = stepCompletion.filter(Boolean).length;

  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="w-full h-4 bg-gray-200">
      <div
        className="h-4 bg-emerald-700 transition-width duration-300"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
