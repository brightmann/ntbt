import { cx } from "@/src/utils";
import Link from "next/link";
import React from "react";

const pill =
  "inline-block py-1.5 md:py-2 px-4 md:px-6 rounded-full border-2 border-solid border-dark dark:border-light hover:scale-105 transition-all ease duration-200 m-1 text-sm md:text-base";

const CategoryPager = ({ categorySlug, currentPage, totalPages }) => {
  if (totalPages <= 1) return null;

  const pageLink = (pageNum) =>
    pageNum === 1
      ? `/categories/${categorySlug}`
      : `/categories/${categorySlug}/page/${pageNum}`;

  const items = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) items.push(i);
  } else {
    items.push(1);
    if (currentPage > 3) items.push("ellipsis-start");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      items.push(i);
    }
    if (currentPage < totalPages - 2) items.push("ellipsis-end");
    items.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center flex-wrap mt-10 md:mt-16 px-5">
      {currentPage > 1 && (
        <Link
          href={pageLink(currentPage - 1)}
          className={cx(pill, "bg-light text-dark dark:bg-dark dark:text-light")}
        >
          Previous
        </Link>
      )}
      {items.map((item) =>
        typeof item === "string" ? (
          <span key={item} className="mx-1 text-dark dark:text-light">
            …
          </span>
        ) : item === currentPage ? (
          <span
            key={item}
            className={cx(pill, "bg-dark text-light dark:bg-light dark:text-dark")}
          >
            {item}
          </span>
        ) : (
          <Link
            key={item}
            href={pageLink(item)}
            className={cx(pill, "bg-light text-dark dark:bg-dark dark:text-light")}
          >
            {item}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link
          href={pageLink(currentPage + 1)}
          className={cx(pill, "bg-light text-dark dark:bg-dark dark:text-light")}
        >
          Next
        </Link>
      )}
    </nav>
  );
};

export default CategoryPager;
