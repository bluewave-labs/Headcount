/**
 * This modules contains utility functions */

/**
 * This function helps to find hierarchical structure from a given employee to the top of management level.
 * @param {} db database containing the data
 * @param {*} empId employee id
 * @returns an object of hierarchical structure empId and level of priority
 */
const getReportTo = async (db, empId) => {
  const results = [];
  let priority = 1;
  let managerId = null;
  while (true) {
    const employee = await db.employee.findByPk(empId);
    if (employee === null) {
      break;
    }
    const data = {};
    if (!employee.managerId) {
      // current employee has no manager
      if (results.length === 0) {
        // employee is the chief executive
        data.managerId = null;
        data.priority = null;
        results.push(data);
      }
      break;
    }
    data.managerId = employee.managerId;
    data.priority = priority;
    results.push(data);
    empId = employee.managerId;
    managerId = employee.managerId;
    priority++;
  }
  return results;
};

/**
 * This function creates an object that enables a case insensitive search on a specified column.
 * @param {*} db database containing the data
 * @param {*} colName column to be searched
 * @param {*} item item to search for
 * @returns sequelize object
 */
const getComparator = (db, colName, item) => {
  if (!item) {
    return null;
  }
  return db.sequelize.where(
    db.Sequelize.fn("lower", db.Sequelize.col(colName)),
    item.toLowerCase()
  );
};
/**
 * This function gets the name of the manager of an employee
 * @param {*} db database containing the data
 * @param {Number} managerId employee id number the manager
 * @returns Manager's name of an employee or null
 */
const getManagerName = async (db, managerId) => {
  const manager = await db.employee.findByPk(managerId);
  if (manager) {
    return `${manager.firstName} ${manager.lastName}`;
  }
  //manager does not exist - return null
  return null;
};
// source: https://gist.github.com/farhad-taran/f487a07c16fd53ee08a12a90cdaea082
function runAtSpecificTimeOfDay(hour, minutes, func) {
  const twentyFourHours = 86400000;
  const now = new Date();
  let eta_ms =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minutes,
      0,
      0
    ).getTime() - now;
  if (eta_ms < 0) {
    eta_ms += twentyFourHours;
  }
  setTimeout(function () {
    //run once
    func();
    // run every 24 hours from now on
    setInterval(func, twentyFourHours);
  }, eta_ms);
}

// Utility function to create email context such recipient name, company name etc.
async function createEmailContext({ empId, email, db, copyrightYear }) {
  // Obtain employee's name
  let employee = null;
  if (empId) {
    employee = await db.employee.findByPk(empId, {
      attributes: ["firstName", "lastName"],
    });
  } else if (email) {
    employee = await db.employee.findOne({
      attributes: ["firstName", "lastName"],
      where: { email: email },
    });
  }
  // Obtain company name
  const company = await db.company.findOne({
    attributes: ["companyName"],
  });

  const context = {
    employeeName: employee
      ? `${employee.firstName} ${employee.lastName}`
      : `Sir/Madam`,
    companyName: company ? `${company.companyName}` : "BlueWave Labs",
    email: process.env.EMAIL, // Support email
    copyrightYear: copyrightYear? copyrightYear : new Date().getFullYear()
  };
  return context;
}

module.exports = {
  getReportTo,
  getComparator,
  getManagerName,
  runAtSpecificTimeOfDay,
  createEmailContext,
};
