import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

export default function WorkSpace() {
  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4">
      <LeftSide />

      <RightSide />
    </div>
  );
}
