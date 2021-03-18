import createPagination from "../createPagination";

test.each`
    totalPages | currentPage | range | expectedResult
    ${3}       | ${1}        | ${5}  | ${[1, 2, 3]}
    ${10}      | ${1}        | ${5}  | ${[1, 2, 3, 4, 5]}
    ${103}     | ${10}       | ${5}  | ${[8, 9, 10, 11, 12]}
    ${100}     | ${76}       | ${5}  | ${[74, 75, 76, 77, 78]}
    ${1000}    | ${999}      | ${5}  | ${[996, 997, 998, 999, 1000]}
    ${1000}    | ${997}      | ${5}  | ${[995, 996, 997, 998, 999]}
    ${10}      | ${3}        | ${10} | ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    ${88}      | ${62}       | ${7}  | ${[59, 60, 61, 62, 63, 64, 65]}
`(
    "returns $expectedResult when current page is $currentPage, total pages is $totalPages and range is $range",
    ({ totalPages, currentPage, range, expectedResult }) => {
        const actual = createPagination({
            totalPages,
            currentPage,
            range,
        });

        expect(actual).toEqual(expectedResult);
    },
);
