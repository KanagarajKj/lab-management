import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LaboratoryFormData, LaboratoryFormProps } from "../../types/types";
import { laboratorySchema, formOptions } from "../../schema/formSchema"; 
import { Trash2, Plus } from "lucide-react";
import Select from 'react-select';
import { updateLaboratory, addLaboratory } from "../../reducers/labSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

export const LaboratoryForm: React.FC<LaboratoryFormProps> = ({ initialData, isEdit, onClose }) => {
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<LaboratoryFormData>({
    resolver: yupResolver(laboratorySchema) as any,
    defaultValues: {
      labName: initialData?.labName || "",
      location: initialData?.location || "",
      contactPerson: initialData?.contactPerson || "",
      contactNumber: initialData?.contactNumber || "",
      status: initialData?.status || "Active",
      servicesOffered: initialData?.servicesOffered || [], 
      testMethods: initialData?.testMethods || [], 
    },
  });

  // Handle initial data reset
  useEffect(() => {
    if (initialData && isEdit) {
      reset({
        labName: initialData.labName,
        location: initialData.location,
        contactPerson: initialData.contactPerson,
        contactNumber: initialData.contactNumber,
        status: initialData.status,
        servicesOffered: initialData.servicesOffered,
        testMethods: initialData.testMethods,
      });
    } else {
      clearErrors()
    }
  }, [initialData, reset, clearErrors]);

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray<any, "servicesOffered">({
    control,
    name: "servicesOffered",
  });

  const {
    fields: testMethodFields,
    append: appendTestMethod,
    remove: removeTestMethod,
  } = useFieldArray<LaboratoryFormData, "testMethods">({
    control,
    name: "testMethods",
  });

  const watchTestMethods = watch('testMethods');

  const onSubmit = (data: LaboratoryFormData) => {
    if(Object.keys(errors)?.length === 0) {
      if(isEdit) {
        dispatch(updateLaboratory(data))
        toast.success("Successfully added the data.")
        reset();
      } else {
        dispatch(addLaboratory(data))
        toast.success("Successfully updated the data.")
        reset();
      }
    }
    if (onClose) {
      reset({
        labName: "",
        location: "",
        contactPerson: "",
        contactNumber: "",
        status: "Active",
        servicesOffered: [], 
        testMethods: [], 
      });
      onClose();
      clearErrors(); 
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-white shadow-md rounded max-h-[80vh] overflow-y-auto flex flex-col"
    >
      <div className="flex-grow space-y-4">
        {/* Basic Laboratory Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl mb-2">Lab Name</h3>
            <input
              {...register("labName")}
              className="w-full p-2 border rounded"
              placeholder="Enter laboratory name"
            />
            {errors.labName && (
              <p className="text-red-500 text-sm">{errors.labName.message}</p>
            )}
          </div>

          <div>
            <h3 className="text-xl mb-2">Location</h3>
            <input
              {...register("location")}
              className="w-full p-2 border rounded"
              placeholder="Enter laboratory location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          <div>
            <h3 className="text-xl mb-2">Contact Person</h3>
            <input
              {...register("contactPerson")}
              className="w-full p-2 border rounded"
              placeholder="Enter contact person name"
            />
            {errors.contactPerson && (
              <p className="text-red-500 text-sm">{errors.contactPerson.message}</p>
            )}
          </div>

          <div>
            <h3 className="text-xl mb-2">Contact Number</h3>
            <input
              {...register("contactNumber")}
              className="w-full p-2 border rounded"
              placeholder="Enter contact number"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>
            )}
          </div>

          <div>
            <h3 className="text-xl mb-2">Status</h3>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <select {...field} className="w-full p-2 border rounded">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              )}
            />
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>
        </div>

        {/* Services Offered Section */}
        <div>
          <h3 className="text-xl mb-2">Services Offered</h3>
          <div className="max-h-40 overflow-y-auto">
            {serviceFields.map((field, index) => (
              <div key={field.id} className="flex mb-2">
                <input
                  {...register(`servicesOffered.${index}`)}
                  className="w-full p-2 border rounded mr-2"
                  placeholder="Enter service"
                />
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="bg-white text-white p-2 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => appendService("")}
            className="bg-blue-500 text-white p-2 rounded mt-2 flex gap-1 items-center"
          >
          <Plus className="w-5 h-5" />
          <span>Service</span>
          </button>
        </div>

        {/* Test Methods Section */}
        <div>
          <h3 className="text-xl mb-4">Test Methods</h3>
          <div className="max-h-80 overflow-y-auto space-y-4">
            {testMethodFields.map((fields, index) => (
              <div key={fields.id} className="border p-4 rounded">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Sample Type</label>
                    <Controller
                      control={control}
                      name={`testMethods.${index}.sampleType`}
                      render={({ field }) => (
                        <select {...field} className="w-full p-2 border rounded">
                          {formOptions.sampleTypeOptions.map((type:any) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.testMethods?.[index]?.sampleType && (
                      <p className="text-red-500 text-sm">
                        {errors.testMethods[index]?.sampleType?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2">Method</label>
                    <input
                      {...register(`testMethods.${index}.method`)}
                      className="w-full p-2 border rounded"
                      placeholder="Enter method name"
                    />
                    {errors.testMethods?.[index]?.method && (
                      <p className="text-red-500 text-sm">
                        {errors.testMethods[index]?.method?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block mb-2">Parameters</label>
                  <Controller
                    control={control}
                    name={`testMethods.${index}.parameters`}
                    shouldUnregister={true} // This will help clean up when sample type changes
                    render={({ field: { onChange, value } }) => {
                      const options = formOptions.parameterOptions[watchTestMethods[index]?.sampleType]?.map(param => ({
                        value: param,
                        label: param
                      })) || [];
                      
                      // Transform the current value to match react-select format
                      const selectedValues = Array.isArray(value) 
                        ? value.map(item => ({
                            value: item,
                            label: item
                          }))
                        : [];

                      // Reset value when options change
                      if (selectedValues.length > 0 && !options.some(opt => 
                        selectedValues.some(sel => sel.value === opt.value)
                      )) {
                        onChange([]);
                      }

                      return (
                        <Select
                          value={selectedValues}
                          onChange={(selectedOptions) => {
                            onChange(selectedOptions?.map(option => option.value) || []);
                          }}
                          isMulti
                          options={options}
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      );
                    }}
                  />
                  {errors.testMethods?.[index]?.parameters && (
                    <p className="text-red-500 text-sm">
                      {errors.testMethods[index]?.parameters?.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeTestMethod(index)}
                  className="mt-4 bg-red-500 text-white p-2 rounded flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4 text-white-500" />
                  <span>Test Method</span>
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              appendTestMethod({ method: "", sampleType: "Oil", parameters: [] })
            }
            className="bg-blue-500 text-white p-2 rounded mt-2 flex items-center gap-1"
          >
            <Plus className="w-5 h-5" />
            <span>Test Method</span>
          </button>
        </div>
      </div>

      {/* Submit button fixed at bottom */}
      <div className=" bottom-0 bg-white pt-4 border-t flex gap-4">
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white p-4 rounded"
        >
          {initialData ? "Update Laboratory" : "Create Laboratory"}
        </button>
        <button 
          type="button"
          className="w-full bg-red-600 text-white p-4 rounded"
          onClick={()=> {
            reset({
              labName: "",
              location: "",
              contactPerson: "",
              contactNumber: "",
              status: "Active",
              servicesOffered: [], 
              testMethods: [], 
            });
            onClose();
            clearErrors(); 
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};