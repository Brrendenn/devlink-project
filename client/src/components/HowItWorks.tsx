import { UserPlus, Link as LinkIcon, Share2 } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up for free in just a few seconds. All you need is an email to get started and claim your unique DevLink username.",
  },
  {
    icon: LinkIcon,
    title: "Add & Organize Links",
    description:
      "Our simple dashboard allows you to add, edit, and arrange all your important links with an easy-to-use drag-and-drop interface.",
  },
  {
    icon: Share2,
    title: "Share Everywhere",
    description:
      "Add your single DevLink URL to your social media bios, email signatures, and resumes. One link is all you'll ever need to share.",
  },
];

export function HowItWorks() {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-12">
        Get Started in Seconds
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-purple-200 dark:bg-blue-900/20 rounded-full">
                <step.icon className="w-8 h-8 text-purple-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-600 font-medium dark:text-gray-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
