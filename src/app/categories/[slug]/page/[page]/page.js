import BlogLayoutThree from "@/src/components/Blog/BlogLayoutThree";
import Categories from "@/src/components/Blog/Categories";
import CategoryPager from "@/src/components/Blog/CategoryPager";
import {
  POSTS_PER_PAGE,
  getAllCategories,
  getBlogsForCategory,
  getTotalPages,
} from "@/src/components/Blog/categoryUtils";
import { notFound, redirect } from "next/navigation";

export async function generateStaticParams() {
  const paths = [];
  const categories = getAllCategories();

  categories.forEach((categorySlug) => {
    const blogs = getBlogsForCategory(categorySlug);
    const totalPages = getTotalPages(blogs);
    for (let page = 2; page <= totalPages; page++) {
      paths.push({ slug: categorySlug, page: String(page) });
    }
  });

  return paths;
}

export async function generateMetadata({ params }) {
  const { slug: categorySlug, page } = await params;
  return {
    title: `${categorySlug.replaceAll("-", " ")} Blogs - Page ${page}`,
    description: `Learn more about ${categorySlug === "all" ? "web development" : categorySlug} through our collection of expert blogs and tutorials`,
  };
}

const CategoryPagedPage = async ({ params }) => {
  const { slug: categorySlug, page } = await params;
  const pageNum = parseInt(page, 10);

  const allCategories = getAllCategories();
  const blogs = getBlogsForCategory(categorySlug);
  const totalPages = getTotalPages(blogs);

  if (pageNum === 1) {
    redirect(`/categories/${categorySlug}`);
  }
  if (!Number.isInteger(pageNum) || pageNum < 1 || pageNum > totalPages) {
    notFound();
  }

  const pageBlogs = blogs.slice(
    (pageNum - 1) * POSTS_PER_PAGE,
    pageNum * POSTS_PER_PAGE
  );

  return (
    <article className="mt-12 flex flex-col text-dark dark:text-light">
      <div className=" px-5 sm:px-10  md:px-24  sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">#{categorySlug}</h1>
        <span className="mt-2 inline-block">
          Discover more categories and expand your knowledge!
        </span>
      </div>
      <Categories categories={allCategories} currentSlug={categorySlug} />

      <div className="grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 grid-rows-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
        {pageBlogs.map((blog, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
      <CategoryPager
        categorySlug={categorySlug}
        currentPage={pageNum}
        totalPages={totalPages}
      />
    </article>
  );
};

export default CategoryPagedPage;
