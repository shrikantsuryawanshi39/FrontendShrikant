import React from 'react'
import { useForm } from 'react-hook-form'

const AddCluster = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = (data) => {
    alert("Cluster added successfully!");
    console.log("Cluster Data:", data);
    reset(); 
  };

  return (
    <div className="px-4">
      <div className="w-full max-w-3xl text-black flex items-center justify-center mx-auto my-10 p-5 sm:p-10 md:p-16">
        <div className="w-full sm:w-md border border-gray-400 p-5 sm:p-6 rounded-lg shadow-md bg-white">
          <h1 className="text-xl sm:text-2xl font-bold mb-5 text-center">Add Cluster</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-sm">
            {/* Cluster Name */}
            <div>
              <label htmlFor="clusterName" className="block font-medium mb-1">Cluster Name</label>
              <input
                id="clusterName"
                type="text"
                placeholder="Full Name"
                {...register("clustername", {
                  required: "Cluster Name is required",
                  minLength: {
                    value: 3,
                    message: "Cluster Name must be at least 3 characters"
                  }
                })}
                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-sm"
              />
              {errors.clustername && (
                <p className="text-red-500 mt-1">{errors.clustername.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block font-medium mb-1">Description</label>
              <textarea
                id="description"
                rows={3}
                placeholder="Enter Description"
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 10, message: "Minimum 10 characters required" },
                  maxLength: { value: 100, message: "Maximum 100 characters allowed" }
                })}
                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-sm"
              />
              {errors.description && (
                <p className="text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer w-full transition-all duration-300"
            >
              Add Cluster
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCluster;
