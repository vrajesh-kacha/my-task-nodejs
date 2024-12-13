import React, { useState, useEffect } from "react";
import "../vendor/fontawesome-free/css/all.min.css";
import "../vendor/fontawesome-free/css/all.css";
import "../css/sb-admin-2.css";
import axios from "axios";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  Column,
  SortingRule,
  ColumnInstance,
} from "react-table";
import Layout from "./Layout.tsx";

const Form = () => {
  interface EmployeeForm {
    name: string;
    position: string;
    office: string;
    age: string;
    startDate: string;
    salary: string;
  }

  interface Employee {
    id: number;
    name: string;
    position: string;
    office: string;
    age: number;
    startDate: string;
    salary: number;
  }
  const [employee, setEmployee] = useState<EmployeeForm>({
    name: "",
    position: "",
    office: "",
    age: "",
    startDate: "",
    salary: "",
  });

  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [id, setId] = useState(0);
  const data: Employee[] = React.useMemo(() => employeeData, [employeeData]);
  const [loading, setLoading] = useState(true);
  const getEmployees = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/employee/get-employees`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setEmployeeData(data.employee);
      console.log(data.employee);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      if (id) {
        handleEdit();
        return;
      }

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/employee/add-employee`,
        {
          name: employee.name,
          position: employee.position,
          office: employee.office,
          age: parseInt(employee.age),
          startDate: employee.startDate,
          salary: parseInt(employee.salary),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      setEmployee({
        name: "",
        position: "",
        office: "",
        age: "",
        startDate: "",
        salary: "",
      });
      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/employee/update-employee/${id}`,
        {
          name: employee.name,
          position: employee.position,
          office: employee.office,
          age: parseInt(employee.age),
          startDate: employee.startDate,
          salary: parseInt(employee.salary),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      setEmployee({
        name: "",
        position: "",
        office: "",
        age: "",
        startDate: "",
        salary: "",
      });
      setId(0);
      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (rowid: number) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/employee/delete-employee/${rowid}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEmployee({
      name: "",
      position: "",
      office: "",
      age: "",
      startDate: "",
      salary: "",
    });
    setId(0);
  }
  const columns: Column<Employee>[] = React.useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
        sortType: (rowA: any, rowB: any, columnId: string) => {
          const a = rowA.values[columnId].toLowerCase();
          const b = rowB.values[columnId].toLowerCase();
          return a > b ? 1 : a < b ? -1 : 0;
        },
      },
      {
        accessor: "position",
        Header: "Position",
        sortType: (rowA: any, rowB: any, columnId: string) => {
          const a = rowA.values[columnId].toLowerCase();
          const b = rowB.values[columnId].toLowerCase();
          return a > b ? 1 : a < b ? -1 : 0;
        },
      },
      {
        accessor: "office",
        Header: "Office",
        sortType: (rowA: any, rowB: any, columnId: string) => {
          const a = rowA.values[columnId].toLowerCase();
          const b = rowB.values[columnId].toLowerCase();
          return a > b ? 1 : a < b ? -1 : 0;
        },
      },
      {
        accessor: "age",
        Header: "Age",
      },
      {
        accessor: "startDate",
        Header: "Start Date",
        Cell: ({ value }: { value: string }) => {
          const date = new Date(value);
          return `${date.getFullYear()}/${
            date.getMonth() + 1
          }/${date.getDate()}`;
        },
      },
      {
        accessor: "salary",
        Header: "Salary",
      },
      {
        id: "actions",
        Header: "Actions",
        Cell: ({ row }: { row: any }) => (
          <div className="d-flex align-items-center">
            <button
              className="btn btn-info btn-circle btn-sm"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setEmployee({
                  name: row.original.name,
                  position: row.original.position,
                  office: row.original.office,
                  age: row.original.age,
                  startDate: row.original.startDate,
                  salary: row.original.salary,
                });
                setId(row.original.id);
              }}
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="btn btn-danger btn-circle btn-sm"
              onClick={() => handleDelete(row.original.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    setGlobalFilter,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    nextPage,
    previousPage,
    setSortBy,
    getState
  }: any = 
  useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [{ id: columns[0].accessor, desc: false }]
      } as any,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const toggleSort = (
    column: ColumnInstance<object>,
    setSortBy: (sortBy: SortingRule<object>[]) => void
  ) => {
    const { sortBy }: { sortBy: SortingRule<object>[] } = getState();
    const currentSortState = sortBy.find((sort) => sort.id === column.id);

    if (currentSortState) {
      setSortBy([{ id: column.id as string, desc: !currentSortState.desc }]);
    } else {
      setSortBy([{ id: column.id as string, desc: false }]);
    }
  };
  const renderPageButtons = () => {
    const pagesPerGroup = 3;
    const currentGroup = Math.floor(state.pageIndex / pagesPerGroup);
    const startPage = currentGroup * pagesPerGroup;
    const endPage = Math.min(startPage + pagesPerGroup, pageCount);

    const pageButtons = [];
    for (let i = startPage; i < endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => gotoPage(i)}
          className={`btn btn-sm ${
            state.pageIndex === i ? "btn-primary" : "btn-outline-primary"
          }`}
          style={{ margin: "0 5px" }}
        >
          {i + 1}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <Layout>
      <div id="page-top">
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <div className="container-fluid">
                <br />
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card mb-2">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Dropdown Card Example
                        </h6>
                        <div>
                          <button
                            className="btn btn-success btn-circle btn-sm"
                            onClick={handleSubmit}
                          >
                            <i className="fas fa-save "></i>
                          </button>
                        {  
                          id ?<button className="btn btn-info btn-circle btn-sm"
                            onClick={handleCancel}>
                            <i className="fas fa-times"></i>
                          </button>:""
                         }
                          <button className="btn btn-primary btn-circle btn-sm">
                            <i className="fas fa-download"></i>
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="form-row gx-3">
                            <div className="mb-3 col-md-6">
                              <label
                                className="small mb-1"
                                htmlFor="inputPosition"
                              >
                                Position
                              </label>
                              <input
                                className="form-control form-control-sm"
                                id="inputPosition"
                                type="text"
                                placeholder="Position"
                                value={`${employee?.position}` || ""}
                                onChange={(e) =>
                                  setEmployee({
                                    ...employee,
                                    position: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mb-3 col-md-3">
                              <label className="small mb-1" htmlFor="inputName">
                                Name
                              </label>
                              <input
                                className="form-control form-control-sm"
                                id="inputName"
                                type="text"
                                placeholder="Name"
                                value={`${employee?.name}` || ""}
                                onChange={(e) =>
                                  setEmployee({
                                    ...employee,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mb-3 col-md-1">
                              <label className="small mb-1" htmlFor="inputAge">
                                Age
                              </label>
                              <input
                                className="form-control form-control-sm"
                                id="inputAge"
                                type="number"
                                placeholder="Age"
                                value={`${employee?.age}` || ""}
                                onChange={(e) =>
                                  setEmployee({
                                    ...employee,
                                    age: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mb-3 col-md-1">
                              <label
                                className="small mb-1"
                                htmlFor="inputStartDate"
                              >
                                Start Date
                              </label>
                              <input
                                className="form-control form-control-sm"
                                id="inputStartDate"
                                type="text"
                                placeholder="YYYY-MM-DD"
                                value={`${employee?.startDate}` || ""}
                                onChange={(e) =>
                                  setEmployee({
                                    ...employee,
                                    startDate: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="form-row gx-3">
                            <div className="mb-3 col col-md-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputOffice"
                              >
                                Office
                              </label>
                              <input
                                className="form-control form-control-sm"
                                id="inputOffice"
                                type="text"
                                placeholder="Office"
                                value={`${employee?.office}` || ""}
                                onChange={(e) =>
                                  setEmployee({
                                    ...employee,
                                    office: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mb-3 col col-md-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputSalary"
                              >
                                Salary
                              </label>
                              <input
                                className="form-control form-control-sm"
                                id="inputSalary"
                                type="number"
                                placeholder="Salary"
                                value={`${employee?.salary}` || ""}
                                onChange={(e) =>
                                  setEmployee({
                                    ...employee,
                                    salary: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </form>
                        <hr className="my-4" />
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <span>Show</span>
                            <select
                              className="form-control form-control-sm"
                              value={state.pageSize}
                              onChange={(e) =>
                                setPageSize(Number(e.target.value))
                              }
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                            <span>entries</span>
                          </div>
                          <div className="ml-auto"></div>
                          <div className="d-flex align-items-center">
                            <span>Search:</span>
                            <input
                              type="form"
                              value={state.globalFilter}
                              className="form-control form-control-sm"
                              onChange={(e) => setGlobalFilter(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="table-responsive">
                          {loading ? (
                            <div>Loading...</div>
                          ) : (
                            <table
                              {...getTableProps()}
                              className="table table-bordered"
                              id="employeeTable"
                              width="100%"
                              cellSpacing="0"
                            >
                              <thead>
                                {headerGroups.map((headerGroup: any) => (
                                  <tr
                                    {...headerGroup.getHeaderGroupProps()}
                                    key={`headerGroup-${headerGroup.id}`}
                                  >
                                    {headerGroup.headers.map((column: any) => (
                                      <th
                                        {...column.getHeaderProps(
                                          column.getSortByToggleProps()
                                        )}
                                        key={`column-${column.id}`}
                                      >
                                        <span
                                          onClick={() => {
                                            toggleSort(column, setSortBy);
                                          }}
                                          style={{ cursor: "pointer" }}
                                        >
                                          {column.render("Header")}
                                          {column.isSorted &&
                                            (column.isSortedDesc
                                              ? " 🔽"
                                              : " 🔼")}
                                        </span>
                                      </th>
                                    ))}
                                  </tr>
                                ))}
                              </thead>
                              <tfoot>
                                {headerGroups.map((headerGroup: any) => (
                                  <tr
                                    {...headerGroup.getHeaderGroupProps()}
                                    key={`footerGroup-${headerGroup.id}`}
                                  >
                                    {headerGroup.headers.map((column: any) => (
                                      <th
                                        {...column.getHeaderProps()}
                                        key={`footerColumn-${column.id}`}
                                      >
                                        {column.render("Header")}
                                      </th>
                                    ))}
                                  </tr>
                                ))}
                              </tfoot>
                              <tbody {...getTableBodyProps()}>
                                {page.map((row: any) => {
                                  prepareRow(row);
                                  return (
                                    <tr
                                      {...row.getRowProps()}
                                      key={`row-${row.id}`}
                                    >
                                      {row.cells.map((cell: any) => (
                                        <td
                                          {...cell.getCellProps()}
                                          key={`cell-${row.id}-${cell.column.id}`}
                                        >
                                          {cell.id === "actions"
                                            ? cell.render("Cell", {
                                                row,
                                                props: {
                                                  handleEdit,
                                                  handleDelete,
                                                },
                                              })
                                            : cell.render("Cell")}
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          )}
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              Showing {state.pageIndex * state.pageSize + 1} to{" "}
                              {Math.min(
                                (state.pageIndex + 1) * state.pageSize,
                                employeeData.length
                              )}{" "}
                              of entries
                            </div>

                            <div>
                              <button
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                                className="btn btn-sm btn-outline-primary hover:bg-primary hover:text-white"
                              >
                                {"Previous"}
                              </button>

                              {renderPageButtons()}

                              <button
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                                className="btn btn-outline-primary btn-sm hover:bg-primary hover:text-white"
                              >
                                {"Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
              <i className="fas fa-angle-up"></i>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Form;
