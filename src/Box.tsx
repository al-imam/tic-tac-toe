export default function Box({
  classes,
  onTap,
}: {
  classes: string;
  onTap: () => void;
}) {
  return (
    <div
      onClick={onTap}
      className={`box w-40 h-40 flex justify-center items-center ${classes}`}
    ></div>
  );
}
