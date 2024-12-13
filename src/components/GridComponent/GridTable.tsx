import React, { useMemo, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from 'react-redux';
import FormModal from "../ModalComponent/FormModal";
import {LaboratoryFormData} from "../../types/types";
import { deleteLaboratory } from "../../reducers/labSlice";

ModuleRegistry.registerModules([AllCommunityModule]);

const GridTable = () => {
  const dispatch = useDispatch();
  const laboratories = useSelector((state: any) => state.labData.laboratories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState<LaboratoryFormData | undefined>();

  console.log(laboratories,"laboratories")

  const onClose = ()=> {
    setIsModalOpen(false)
    setData(undefined)
  };

  const actionCellRenderer = (params: any) => {
  return (
    <div className="flex space-x-2 p-3">
      <button 
        onClick={() => onEditClick(params?.data)} 
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors h-8 flex justify-center items-center"
      >
        Edit
      </button>
      <button 
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this laboratory?')) {
            dispatch(deleteLaboratory(params.data.id));
          }
        }} 
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors h-8 flex justify-center items-center"
      >
        Delete
      </button>
    </div>
  );
  };

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
    };
  }, []);

  const handleSubmit = () => {
    setIsModalOpen(true);
  }

  const onEditClick = (data: any) => {
    setData(data);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const columns: ColDef[] = useMemo(() => [
    { 
      headerName: 'ID', 
      field: 'id', 
      flex: 1,
      minWidth: 50,
      cellRenderer: (params: any) => (
        <div className="p-3">
          <button 
            onClick={() => onEditClick(params?.data)} 
            className="text-blue-600 underline hover:text-blue-800"
          >
            {params.value}
          </button>
        </div>
      ),
    },
    { 
      headerName: 'Lab Name', 
      field: 'labName',
      flex: 1,
      minWidth: 150,
      cellClass: 'p-3',
    },
    { 
      headerName: 'Location', 
      field: 'location',
      flex: 1,
      minWidth: 150,
      cellClass: 'p-3',
    },
    { 
      headerName: 'Contact Person', 
      field: 'contactPerson',
      flex: 1,
      minWidth: 150,
      cellClass: 'p-3',
    },
    { 
      headerName: 'Contact Number', 
      field: 'contactNumber',
      flex: 1,
      minWidth: 130,
      cellClass: 'p-3',
    },
    { 
      headerName: 'Status', 
      field: 'status',
      flex: 1,
      minWidth: 100,
      cellRenderer: (params: any) => (
        <div className="p-3">
          <span 
            className={`p-2 rounded text-sm font-medium ${
              params.value === 'Active' 
                ? 'bg-green-200 text-green-800' 
                : 'bg-red-200 text-red-800'
            }`}
          >
            {params.value}
          </span>
        </div>
      ),
    },
    { 
      headerName: 'Services Offered', 
      field: 'servicesOffered',
      flex: 2,
      minWidth: 200,
      cellClass: 'p-3',
      valueFormatter: (params) => params.value.join(', '),
    },
    { 
      headerName: 'Actions', 
      cellRenderer: actionCellRenderer,
      flex: 1,
      minWidth: 150,
      sortable: false,
      filter: false,
    }
  ], [laboratories]);

  return (
    <>
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-5 bg-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Laboratory Management</h2>
        <button 
          type="button"
          onClick={()=> handleSubmit()} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center space-x-2"
        >
          <span>Add New Laboratory</span>
        </button>
      </div>
      
      <div className="w-full overflow-x-auto">
        <AgGridReact
          className="ag-theme-alpine"
          rowData={laboratories}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
          headerHeight={50}
          rowHeight={55}
          domLayout="autoHeight" // Adjust height automatically
          suppressHorizontalScroll={false} // Ensure horizontal scrolling
            // suppressVerticalScroll={false} 
        />
      </div>

      {laboratories.length === 0 && (
        <div className="text-center py-8 bg-gray-50">
          <p className="text-gray-600">No laboratories found. Click 'Add New Laboratory' to get started.</p>
        </div>
      )}
      </div>
      <FormModal isOpen={isModalOpen} onClose={onClose} isEdit={isEdit} data={data}/>
    </>
  );
};

export default GridTable