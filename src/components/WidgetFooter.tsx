import { EchoboxIcon } from "./EchoboxIcon";

export function WidgetFooter() {
  return (
    <div className="p-2 text-center text-xs text-gray-400">
      <span className="flex items-center justify-center">
        <EchoboxIcon className="w-4 h-4" />
        Widget by <span className="font-semibold ml-1">EchoBox</span>
      </span>
    </div>
  );
}
