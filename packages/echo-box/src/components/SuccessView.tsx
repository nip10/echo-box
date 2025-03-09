import { Check } from "lucide-preact";

export function SuccessView() {
  return (
    <div className="p-4 flex flex-col items-center justify-center space-y-4 h-full">
      <div className="rounded-full bg-green-100 p-3 animate-[slide-up-fade_0.3s_ease-out]">
        <Check className="w-6 h-6 text-green-600" />
      </div>
      <p className="text-center text-gray-700 animate-[slide-up-fade_0.3s_ease-out_0.1s]">
        Thank you for your feedback!
      </p>
    </div>
  );
}
