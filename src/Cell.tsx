export default function Cell({ classes }: { classes: string }) {
  return (
    <div
      className={`cell w-40 h-40 flex justify-center items-center ${classes}`}
    ></div>
  );
}
