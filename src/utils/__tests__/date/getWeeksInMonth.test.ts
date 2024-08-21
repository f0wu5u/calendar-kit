import {getWeeksInMonth} from "../../date";

describe('getWeeksInMonth', function () {
    it("return 5 weeks for January, 2024", ()=>{
        const results = getWeeksInMonth("2024-01-01" , 1)
        expect(results).toStrictEqual(5)
    })
    it("return 6 weeks for December, 2024", ()=>{
        const results = getWeeksInMonth("2024-12-01" , 1)
        expect(results).toStrictEqual(6)
    })
});