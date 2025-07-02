import React from "react";
import Link from "next/link";
import { Github, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-slate-800">
      <div className="container mx-auto space-y-8 px-4 py-12 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          <div>
            <Link href="/" className="text-4xl font-bold text-purple-600 dark:text-blue-700">
              DevLink
            </Link>
            <p className="mt-4 max-w-xs text-sm text-gray-500 dark:text-gray-400">
              Your personal hub for all your important developer links. One link
              to rule them all.
            </p>
            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Twitter</span>
                  <Twitter className="size-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">GitHub</span>
                  <Github className="size-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram className="size-6" />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Product
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="/#features"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Resources
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} DevLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
