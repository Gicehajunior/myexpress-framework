const mexDtParser = require("@config/mexDtParser");

describe("mexDtParser", () => {
    let sampleData;

    beforeEach(() => {
        sampleData = [
            { id: 1, name: "John Doe", age: 25 },
            { id: 2, name: "Mike Dave", age: 30 }
        ];
    });

    test("should add a new column to sampleData", () => {
        const processedData = new mexDtParser(sampleData)
            .addColumn("status", "Active")
            .make();
        
        expect(processedData).toEqual([
            { id: 1, name: "John Doe", age: 25, status: "Active" },
            { id: 2, name: "Mike Dave", age: 30, status: "Active" }
        ]);
    });

    test("should add a new column with a preprocessed value to sampleData", () => {
        const processedData = new mexDtParser(sampleData)
            .addColumn("category", row => row.age > 26 ? "Senior" : "Junior")
            .make();
        
        expect(processedData).toEqual([
            { id: 1, name: "John Doe", age: 25, category: "Junior" },
            { id: 2, name: "Mike Dave", age: 30, category: "Senior" }
        ]);
    });

    test("should edit an existing column in sampleData", () => {
        const processedData = new mexDtParser(sampleData)
            .editColumn("name", (value) => value.toUpperCase())
            .make();
        
        expect(processedData).toEqual([
            { id: 1, name: "JOHN DOE", age: 25 },
            { id: 2, name: "MIKE DAVE", age: 30 }
        ]);
    });

    test("should delete an existing column in sampleData", () => {
        const processedData = new mexDtParser(sampleData)
            .deleteColumn("age")
            .make();
        
        expect(processedData).toEqual([
            { id: 1, name: "John Doe" },
            { id: 2, name: "Mike Dave" }
        ]);
    });

    test("should use addColumn, editColumn,deleteColumn and make func, in a chain format", () => {
        const processedData = new mexDtParser(sampleData)
            .addColumn("status", "Active")
            .editColumn("name", (value) => value.toLowerCase())
            .deleteColumn("age")
            .make();
        
        expect(processedData).toEqual([
            { id: 1, name: "john doe", status: "Active" },
            { id: 2, name: "mike dave", status: "Active" }
        ]);
    });
});
