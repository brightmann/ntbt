import { blogs as allBlogs } from "@/.velite/generated";
import { slug } from "github-slugger";

export const POSTS_PER_PAGE = 5;

export function getAllCategories() {
  const allCategories = ["all"];
  allBlogs.forEach((blog) => {
    blog.tags.forEach((tag) => {
      const slugified = slug(tag);
      if (!allCategories.includes(slugified)) {
        allCategories.push(slugified);
      }
    });
  });
  allCategories.sort();
  return allCategories;
}

export function getBlogsForCategory(categorySlug) {
  return allBlogs.filter((blog) => {
    if (categorySlug === "all") {
      return true;
    }
    return blog.tags.some((tag) => slug(tag) === categorySlug);
  });
}

export function getTotalPages(blogs) {
  return Math.max(1, Math.ceil(blogs.length / POSTS_PER_PAGE));
}
