import { useState } from "react";

const Pagination = (props) => {
    return (
        <ul>
            <li>
                <a href="#">First</a>
            </li>
            <li>
                <a href="#">Previous</a>
            </li>
            <li>
                <a href="#">1</a>
            </li>
            <li>
                <a href="#">
                    <span hideVisually>Page</span>2
                </a>
            </li>
            <li>
                <a href="#">Next</a>
            </li>
            <li>
                <a href="#">Last</a>
            </li>
        </ul>
    );
};

const PaginatedContent = ({
    children,
    totalRecords = 200000000000,
    recordsPerPage = 1,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    // useMemo might not be needed, only use it when you see a visible
    // performance issue. Prevents the calculation being performed on every render.
    // you will only see the performance gains when you get millions or larger number of records returned

    const numberOfPages = React.useMemo(
        () => Math.floor(totalRecords / recordsPerPage),
        [totalRecords, recordsPerPage],
    );
    //const numberOfPages = Math.floor(totalRecords / recordsPerPage);

    // tested in profiler with 200000000000 records
    // and performance was 1.2ms without useMemo and 0.5ms with useMemo

    const renderPagination = () => (
        <Pagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            onPageChange={setCurrentPage}
        />
    );

    return (
        <div>
            {renderPagination()}
            {children}
            {renderPagination()}
        </div>
    );
};

function App() {
    return (
        <PaginatedContent>
            <ul>
                {Array(9)
                    .fill(null)
                    .map(() => (
                        <li
                            style={{ display: "inline-block", padding: "1rem" }}
                        >
                            <h2>Card title</h2>
                            <p>Card content</p>
                            <a href="#">Link to Repo</a>
                        </li>
                    ))}
            </ul>
        </PaginatedContent>
    );
}

export default App;
