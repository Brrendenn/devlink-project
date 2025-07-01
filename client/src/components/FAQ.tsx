import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    value: "item-1",
    question: "What exactly is DevLink?",
    answer:
      "DevLink is a simple, powerful link-in-bio tool designed specifically for developers, designers, and tech creators. It allows you to create a single, beautiful page to house all your important links—from your GitHub and LinkedIn profiles to your personal portfolio, blog, and social media accounts.",
  },
  {
    value: "item-2",
    question: "Is DevLink free to use?",
    answer:
      "Yes! The core features of DevLink—creating a profile and adding unlimited links—are completely free. We plan to introduce optional premium features in the future, such as advanced analytics and custom theming.",
  },
  {
    value: "item-3",
    question: "What kind of links can I add to my page?",
    answer:
      "You can add any valid URL you want! The most common links for our users are GitHub, LinkedIn, personal portfolios, Dribbble, Twitter/X, Instagram, YouTube channels, and personal blogs. If it has a URL, you can link to it.",
  },
  {
    value: "item-4",
    question: "How do I customize my DevLink page?",
    answer:
      "Once you sign up, you'll get access to a simple and intuitive dashboard. From there, you can add new links, edit existing ones, and reorder them with a simple drag-and-drop interface. More advanced customization options are coming soon!",
  },
];

export function AccordionDemo() {
  return (
    <div className="w-full">
        <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger className="text-left font-medium cursor-pointer">
                        {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400">
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
  )
}
