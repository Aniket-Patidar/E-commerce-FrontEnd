import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getSingleProduct,
  getAllBrands,
  getAllCategories,
  updateProduct,
} from "../apiCall";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import EditProduct from "@/pages/admin/createProduct";
import Link from "next/link";
import IsLoggin from "@/components/isLoggin";

const ProductForm = () => {
  const { categories, brands } = useSelector((state) => state.Product);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    productById,
    products,
    product,
    totalItems,
    // categories,
    // brands,
    description,
  } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.User);

  const dispatch = useDispatch();
  const router = useRouter();
  const Id = router.query.id;

  useEffect(() => {
    // if (!user || user !== "admin") {
    //   router.push("/loginPage");
    // }
    dispatch(getAllCategories());
    dispatch(getAllBrands());
    if (Id) {
      dispatch(getSingleProduct(Id));
    }
  }, []);

  useEffect(() => {
    if (Id && productById) {
      const {
        title,
        description,
        price,
        discountPercentage,
        stock,
        brand,
        category,
        thumbnail,
        images,
      } = productById;
      setValue("title", title);
      setValue("description", description);
      setValue("discountPercentage", discountPercentage);
      setValue("stock", stock);
      setValue("price", price);
      setValue("brand", brand);
      setValue("category", category);
      setValue("thumbnail", thumbnail);

      if (Array.isArray(images)) {
        setValue("Image1", images[0]);
        setValue("Image2", images[1]);
        setValue("Image3", images[2]);
        setValue("Image4", images[3]);
      }
    }
  }, [productById]);

  const onSubmit = handleSubmit((data) => {
    let newPro = { ...data, user: user.id };
    newPro.discountPercentage = +newPro.discountPercentage;
    newPro.price = +newPro.price;
    newPro.stockCode = +newPro.stockCode;

    let images = [newPro.Image1, newPro.Image2, newPro.Image3, newPro.Image4];
    delete newPro.Image1;
    delete newPro.Image2;
    delete newPro.Image3;
    delete newPro.Image4;
    newPro = { ...newPro, images };
    if (Id) {
      dispatch(updateProduct({ ...productById, ...newPro }));
    } else {
      dispatch(createProduct({ ...newPro, rating: 0 }));
    }
    reset();
    router.push("/admin/productList");
  });

  return (
    <IsLoggin>
      <div className="px-20 py-15 capitalize">
        {(productById || !Id) && (
          <form
            onSubmit={onSubmit}
            className="border-b border-gray-900/10 pb-12"
          >
            <Link href="/">Home</Link>
            <h2 className="text-2xl font-semibold leading-7 mt-5 text-gray-900">
              Create New Product
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    {...register("title", { required: "title is required" })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.title && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.title.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="brands"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category-name"
                    {...register("category", {
                      required: "category is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {categories?.map((item, index) => {
                      return <option key={index}>{item.value}</option>;
                    })}
                  </select>
                </div>
                {errors?.categories && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.categories.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="brands"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  brands
                </label>
                <div className="mt-2">
                  <select
                    id="brands"
                    name="brands"
                    {...register("brands", { required: "brands is required" })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {brands.map((item, index) => {
                      return <option key={index}>{item.value}</option>;
                    })}
                  </select>
                </div>
                {errors?.categories && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.categories.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    type="price"
                    autoComplete="price"
                    {...register("price", { required: "price is required" })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.price && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.price.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  discount Percentage
                </label>
                <div className="mt-2">
                  <input
                    id="discountPercentage"
                    name="discountPercentage"
                    type="discountPercentage"
                    {...register("discountPercentage", {
                      required: "discountPercentage is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.discountPercentage && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.discountPercentage.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  stock
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="stock-code"
                    id="stock-code"
                    {...register("stockCode", {
                      required: "stockCode is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.stockCode && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.stockCode.message}
                  </p>
                )}
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  thumbnail
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="thumbnail"
                    id="thumbnail"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.thumbnail && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.thumbnail.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-full sm:col-start-1">
                <label
                  htmlFor="Image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image1
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="Image1"
                    id="Image1"
                    {...register("Image1", {
                      required: "Image1 is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.Image1 && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.Image1.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="Image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image2
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="Image2"
                    id="Image2"
                    {...register("Image2", {
                      required: "Image2 is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.Image2 && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.Image2.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="Image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image3
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="Image3"
                    id="Image3"
                    {...register("Image3", {
                      required: "Image3 is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.Image3 && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.Image3.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="Image4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image4
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="Image4"
                    id="Image4"
                    {...register("Image4", {
                      required: "Image4 is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.Image4 && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.Image4.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="textarea"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  description
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="textarea"
                    id="textarea"
                    autoComplete="textarea"
                    {...register("description", {
                      required: "description is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
                  />
                </div>
                {errors?.description && (
                  <p className="text-sm capitalize text-red-500">
                    {errors?.description.message}
                  </p>
                )}
              </div>
            </div>

            <button className="mt-5 bg-green-500 text-white p-2 text-light text-sm rounded-sm">
              Submit
            </button>
          </form>
        )}
      </div>
    </IsLoggin>
  );
};

export default ProductForm;
