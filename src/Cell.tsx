export default function Cell({
  classes,
  onTap,
}: {
  classes: string;
  onTap: () => void;
}) {
  return (
    <div
      onClick={onTap}
      className={`cell w-40 h-40 flex justify-center items-center ${classes}`}
    ></div>
  );
}
