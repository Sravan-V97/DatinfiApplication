import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import getData from "../api";
import MyVerticallyCenteredModal from "./Modal";
import PaginationBasic from "./pagination";
import "./table.css";

const headers = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "height",
    label: "Height",
  },
  {
    key: "mass",
    label: "Mass",
  },
  {
    key: "hair_color",
    label: "Hair Colour",
  },
  {
    key: "skin_color",
    label: "skin Colour",
  },
  {
    key: "eye_color",
    label: "Eye Color",
  },
  {
    key: "birth_year",
    label: "Birth year",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "homeworld",
    label: "HomeWorld",
    isLink: true,
  },
  {
    key: "films",
    label: "Films",
    isArray: true,
  },
  {
    key: "species",
    label: "Species",
    isLink: true,
  },
  {
    key: "vehicles",
    label: "Vehicles",
    isArray: true,
  },
  {
    key: "starships",
    label: "Starships",
    isArray: true,
  },
];
function Table() {
  const [show, setShow] = useState(false);
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState(0);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (link, Label) => {
    setLinks(link);
    setTitle(Label);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const loadData = async () => {
    let Response = await getData(currentPage);
    console.log(Response);
    calculatePages(Response.count);
    setUsers(Response.results);
  };
  useEffect(() => {
    if (links.length) setShow(true);
  }, [links]);
  useEffect(() => {
    loadData();
  }, [currentPage]);
  const calculatePages = (total_items) => {
    let _totalPages = Math.ceil(total_items / 10);
    setPages(_totalPages);
    var arr = [];
    for (var i = 1; i <= _totalPages; i++) {
      arr.push(i.toString());
    }
    setTotalPages(arr);
  };
  useEffect(() => {
    loadData();
  }, []);
  const globalSearch = (e) => {
    let searchInput = e.target.value;
    if (!searchInput) loadData();
    let filteredData = users.filter((value) => {
      return (
        value.name
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        value.name
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        value.mass
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        value.hair_color
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        value.skin_color
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        value.eye_color
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        value.birth_year
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        value.gender
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    });
    console.log(filteredData);
    setUsers(filteredData);
  };
  return (
    <div className="ApiTable">
      <input type="checkbox" id="nav-toggle" />
      <section class="sidebar">
        <div class="sidebar-brand">
          <h2>
            <span>
              <i class="fab fa-font-awesome-alt"></i>
            </span>
            <span>DATINFI</span>
          </h2>
        </div>

        <div class="sidebar-menu ">
          <ul>
            <li>
              <a href="#" class="active">
                <span>
                  <i class="fas fa-tachometer-alt"></i>
                </span>
                <span></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i class="fas fa-home"></i>
                </span>
                <span></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i class="fas fa-book-reader"></i>
                </span>
                <span></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i class="fas fa-laptop-code"></i>
                </span>
                <span></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i class="far fa-bell"></i>
                </span>
                <span></span>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <div class="main-content">
        <header>
          <div class="header-title">
            <h2>
              <label for="nav-toggle">
                <i class="fas fa-bars"></i>
              </label>
            </h2>
          </div>

          <div class="search-wrapper">
            <i class="fas fa-search"></i>
            <input
              type="search"
              class="searchInput"
              placeholder="Search Here"
              onInput={globalSearch}
            />
          </div>

          <div class="user-wrapper">
            <img
              src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
              alt="person"
            />
            <div>
              <h4>John</h4>
            </div>
          </div>
        </header>
        <main>
          <div class="container">
            <MyVerticallyCenteredModal
              show={show}
              handleClose={handleClose}
              links={links}
              heading={title}
            />
            <h2>PEOPLES LIST</h2>
            <ul class="responsive-table">
              <li class="table-header">
                {headers.map((item) => (
                  <div class="col col-1">{item.label}</div>
                ))}
              </li>
              {users.map((user) => (
                <li class="table-row">
                  {headers.map((item) => (
                    <div class="col col-1" data-label={item.label}>
                      {item.isArray ? (
                        <Button
                          variant="primary"
                          onClick={() => {
                            handleShow(user[item.key], item.label);
                          }}
                        >
                          <i class="fa fa-info-circle" aria-hidden="true"></i>
                        </Button>
                      ) : item.isLink ? (
                        <Button
                          variant="link"
                          target="_blank"
                          href={
                            user[item.key] ? user[item.key].toString() : "#"
                          }
                        >
                          <i class="fa fa-link" aria-hidden="true"></i>
                        </Button>
                      ) : (
                        user[item.key]
                      )}
                    </div>
                  ))}
                </li>
              ))}
            </ul>
            <PaginationBasic
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              pages={pages}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Table;
