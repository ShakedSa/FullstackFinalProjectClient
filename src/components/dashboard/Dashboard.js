import { React } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsChevronDoubleLeft, BsChevronLeft, BsChevronRight, BsChevronDoubleRight } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import Navbar from "../common/Navbar";
import TableRow from "../common/TableRow";
import Modal from "../common/Modal";
import { dashBoardLinkList, filters } from "../../assets/links";
import { getCookie } from "../../assets/cookies";
import Button from "../common/Button";
import { siteName } from "../../assets/const";
import { ServerAPI } from "../../assets/api";
import Loader from "../common/Loader";

const Dashboard = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const sessionId = getCookie("sessionId");
        if (!sessionId) {
            navigate('/');
        }

        document.title = `${siteName} - Dashboard`;
        // fetch data from server
        setLoading(true);
        getTableRows();
        getTotalRows();
        return () => {
            setLoading(false);
        }

    }, [navigate]);

    const [tableRows, setTableRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [searchParam, setSearchParam] = useState("");

    const [loading, setLoading] = useState(false);

    const [editTreatment, setEditTreatment] = useState({});
    const [editModal, setEditModal] = useState(false);

    const [newTreatment, setNewTreatment] = useState(false);

    const [directions, setDirections] = useState({
        "number": true,
        "info": true,
        "date": true,
        "email": true,
        "carNumber": true
    });

    useEffect(() => {
        getTableRows();
        getTotalRows();
    }, [searchParam, pageNumber])

    useEffect(() => {
        if (!directions.number) {
            sortByNumber();
        } else if (!directions.email) {
            sortByEmail();
        } else if (!directions.date) {
            sortByDate();
        } else if (!directions.info) {
            sortByInformation();
        } else if (!directions.carNumber) {
            sortByCar();
        }
    }, [tableRows])

    const getTableRows = async () => {
        // request from server rows of pageNumber
        setLoading(true);
        const rows = await axios.get(`${ServerAPI}/dashboard/${getCookie("sessionId")}/?page=${pageNumber}&search=${searchParam}`);
        setTableRows(rows.data);
        setLoading(false);
    };

    const getTotalRows = async () => {
        // request server for total number rows
        setLoading(true);
        const rows = await axios.get(`${ServerAPI}/dashboard/gettotal/${getCookie("sessionId")}`);
        setTotalRows(rows.data);
        setLoading(false);
    };

    const deleteRow = async (treatmentNumber) => {
        setLoading(true);
        await axios.delete(`${ServerAPI}/dashboard/delete/${treatmentNumber}`);
        await getTableRows();
        await getTotalRows();
        setLoading(false);
    };

    const editRow = (treatmentNumber) => {
        const rowToEdit = tableRows.find((treatment) => treatment.treatmentNumber === treatmentNumber);
        setEditTreatment(rowToEdit);
        setEditModal(true);
    };

    const saveEdit = async (updatedTreatment) => {
        setLoading(true);
        await axios.patch(`${ServerAPI}/dashboard/updates`, { ...updatedTreatment });
        setEditTreatment({});
        await getTableRows();
        await getTotalRows();
        setLoading(false);
    }

    const sortByNumber = () => {
        let sortFunc;
        if (directions.number) {
            sortFunc = (row1, row2) => {
                if (row1.treatmentNumber < row2.treatmentNumber) {
                    return -1;
                }
                if (row1.treatmentNumber > row2.treatmentNumber) {
                    return 1;
                }
                return 0;
            }
        } else {
            sortFunc = (row1, row2) => {
                if (row1.treatmentNumber > row2.treatmentNumber) {
                    return -1;
                }
                if (row1.treatmentNumber < row2.treatmentNumber) {
                    return 1;
                }
                return 0;
            }
        }
        tableRows.sort(sortFunc);
        setDirections({ ...directions, "number": !directions.number });
    }

    const sortByInformation = () => {
        let sortFunc;
        if (directions.info) {
            sortFunc = (row1, row2) => {
                return row1.treatmentInformation.localeCompare(row2.treatmentInformation);
            }
        } else {
            sortFunc = (row1, row2) => {
                return row2.treatmentInformation.localeCompare(row1.treatmentInformation);
            }
        }
        tableRows.sort(sortFunc);
        setDirections({ ...directions, "info": !directions.info });
    }

    const sortByDate = () => {
        let sortFunc;
        if (directions.date) {
            sortFunc = (row1, row2) => {
                const date1 = new Date(row1.date), date2 = new Date(row2.date);
                if (date1 < date2) {
                    return -1;
                }
                if (date1 > date2) {
                    return 1;
                }
                return 0;
            }
        } else {
            sortFunc = (row1, row2) => {
                const date1 = new Date(row1.date), date2 = new Date(row2.date);
                if (date1 > date2) {
                    return -1;
                }
                if (date1 < date2) {
                    return 1;
                }
                return 0;
            }
        }
        tableRows.sort(sortFunc);
        setDirections({ ...directions, "date": !directions.date });
    }

    const sortByEmail = () => {
        let sortFunc;
        if (directions.email) {
            sortFunc = (row1, row2) => {
                return row1.workerEmail.localeCompare(row2.workerEmail);
            }
        } else {
            sortFunc = (row1, row2) => {
                return row2.workerEmail.localeCompare(row1.workerEmail);
            }
        }
        tableRows.sort(sortFunc);
        setDirections({ ...directions, "email": !directions.email });
    }

    const sortByCar = () => {
        let sortFunc;
        if (directions.carNumber) {
            sortFunc = (row1, row2) => {
                if (row1.carNumber < row2.carNumber) {
                    return -1;
                }
                if (row1.carNumber > row2.carNumber) {
                    return 1;
                }
                return 0;
            }
        } else {
            sortFunc = (row1, row2) => {
                if (row1.carNumber > row2.carNumber) {
                    return -1;
                }
                if (row1.carNumber < row2.carNumber) {
                    return 1;
                }
                return 0;
            }
        }
        tableRows.sort(sortFunc);
        setDirections({ ...directions, "carNumber": !directions.carNumber });
    }

    const addNewTreatment = async (treatment) => {
        // request from server rows of pageNumber
        setLoading(true);
        await axios.post(`${ServerAPI}/dashboard/createTreatment`, { ...treatment, sessionId: getCookie("sessionId") });
        await getTableRows();
        await getTotalRows();
        setLoading(false);
    }

    const showFiltersOptions = () => {
        document.querySelector('.filter-options').classList.toggle('show-links');
    }

    return (
        <>
            <Navbar links={dashBoardLinkList} currentActive="Dashboard" />
            <main className="page">
                <h1>Dashboard</h1>
                <div className="table">
                    <div className="table-header">
                        <span>Treatments Details</span>
                        <div>
                            <input placeholder="Search" onChange={(e) => setSearchParam(e.target.value)} />
                        </div>
                        <Button className="btn nav-btn"
                            content={<BiCog style={{ verticalAlign: "middle", height: "30px" }} />}
                            onClickCallback={() => showFiltersOptions()} />
                    </div>
                    <div className="filter-options">
                        {filters.map((filter, id) => {
                            const callBackName = `sortBy${filter.name.split(' ')[2]}()`;
                            return <div onClick={(e) => { eval(callBackName); showFiltersOptions(); }} key={id} className="filter-option">{filter.name}</div>
                        })}
                    </div>

                    <div className="table-section">
                        {loading && <Loader />}
                        <table>
                            <thead>
                                <tr>
                                    <th onClick={() => sortByNumber()}>Treatment Number</th>
                                    <th onClick={() => sortByInformation()}>Treatment Information</th>
                                    <th onClick={() => sortByDate()}>Date</th>
                                    <th onClick={() => sortByEmail()}>Worker email</th>
                                    <th onClick={() => sortByCar()}>Car Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows?.map((row, id) => {
                                    return <TableRow treatment={row} editCallback={editRow} deleteCallback={deleteRow} key={id} />
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <span style={{ fontSize: "0.9rem" }}>Displaying {pageNumber} - {pageNumber + 9} out of {totalRows} treatments</span>
                        <div className="pages">
                            <div><BsChevronDoubleLeft style={{ verticalAlign: "bottom" }} onClick={() => { setPageNumber(1); getTableRows(); }} /></div>
                            <div><BsChevronLeft onClick={() => {
                                if ((pageNumber - 1) < 1) {
                                    return;
                                }
                                setPageNumber(pageNumber - 1);
                            }} /></div>
                            <div>{pageNumber}</div>
                            <div><BsChevronRight onClick={() => {
                                if (pageNumber * 10 >= totalRows) {
                                    return;
                                }
                                setPageNumber(pageNumber + 1);
                            }} /></div>
                            <div><BsChevronDoubleRight onClick={() => { setPageNumber(totalRows % 10); getTableRows() }} /></div>
                        </div>
                    </div>
                </div>
                <Button className="btn" content="Add New Treatment" onClickCallback={() => setNewTreatment(true)} />
                {editModal && <Modal shouldEdit={true} setDisplay={setEditModal} treatment={editTreatment} save={saveEdit} updateTreatment={setEditTreatment} />}
                {newTreatment && <Modal shouldEdit={true} setDisplay={setNewTreatment} save={addNewTreatment} />}
            </main>

        </>
    )
};

export default Dashboard;
