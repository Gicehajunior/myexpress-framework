const MEX = require('@mex/MEX');
const jwt = require('jsonwebtoken');
const config = require('@config/config');
const User = require('@models/User'); 
const UserUtil = require('@utils/UserUtil');
const mexDtParser = require('@config/mexDtParser');
const utils = require('@config/utils');
const Exception = require('@config/exceptions'); 

class DashboardController extends MEX {
    static async index(req, res) { 
        const status = req.session.status ?? null;
        const message = req.session.message ?? null;
        return res.render("crm/dashboard", { title: "Dashboard Page", status: status, message: message, user: req.session.user });
    } 

    static async getUsers(req, res) {
        try {
            const users = await UserUtil.getAllUsers();
            const usersObj = new mexDtParser(users)
                .addColumn('action', (row) => { 
                    return `<button type="button" class="btn btn-primary btn-sm" data-id='${row.id}'>Edit</button>
                        <button type="button" class="btn btn-primary btn-sm" data-id='${row.id}'>Delete</button>`;
                })
                .editColumn('username', (username) => { 
                    return utils.ucwords(username);  
                })
                .deleteColumn('id')
                .make();

            return res.status(200).json({ status: 'success', data: usersObj });
        } catch (error) {
            if (error instanceof Exception) {  
                if (config.APP.APP_DEBUG) error.mexLogger();
                return res.status(error.status).json({ status: 'error', message: error.message, code: error.code, data: [] });
            } else {  
                if (config.APP.APP_DEBUG) error.mexLogger();
                return res.status(500).json({ status: 'error', message: 'Something went wrong. Please try again later.' });
            }
        }
    }
}

module.exports = DashboardController;
