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
      className={`box w-24 sm:w-40 aspect-square flex justify-center items-center ${classes}`}
    ></div>
  );
}
