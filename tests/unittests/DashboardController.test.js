const DashboardController = require('@controllers/other/DashboardController');
const Exception = require('@config/exceptions');
const UserUtil = require('@utils/UserUtil');
const mexDtParser = require('@config/mexDtParser'); 

jest.mock('@utils/UserUtil'); // replace all the ...funcs in UserUtil class with jest mock fn's

describe('DashboardController', () => {
    let req, res, jsonResponse;

    beforeEach(() => {
        req = {};
        
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }

        res.json = jest.fn((response) => {
            jsonResponse = response;
        });
    });

    it("fn getUsers: it should get all users and return a mexDtParser-processed Object", async () => {
        const mockDataToUse = [
            { id: 1, username: "john doe", email: 'gicehajunior76@gmail.com' },
            { id: 2, username: "mike dave", email: 'gicehajnr76@gmail.com' },
        ];

        // mock UserUtil.getUsers fn to return the mockDataToUse
        await UserUtil.getAllUsers.mockResolvedValue(mockDataToUse);

        // now call the DashboardController.getUsers to test it.
        await DashboardController.getUsers(req, res); 
        expect(res.status).toHaveBeenCalledWith(200);
        expect(jsonResponse).toHaveProperty('data');
    });

    it("fn getUsers: it should be able to handle exceptions", async () => {
        const mockedError = new Exception(500, "INTERNAL_SERVER_ERROR", 'Database Error');

        await UserUtil.getAllUsers.mockRejectedValue(mockedError);

        // call the DashboardController.getUsers to test it.
        await DashboardController.getUsers(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(jsonResponse).toHaveProperty('code');
    });
});