import React from "react";
import { generateId } from "~/helpers/generateId";

export const useEmployeeState = ()=> {
  const initialState = {
    employees: [],
    employeeErrors: [],
    gettedEmployee: null,
    isLoggingEmployee: false,
    isCreatingEmployee: false,
    isUpdatingEmployee: false,
    isDeletingEmployee: false,
    isGettingEmployee: false,
    isGettingEmployees: false
  }

  const [state, setState] = React.useState(initialState);

  const resetStateEmployees = ()=> {
    setState(initialState);
  }

  const setIsLoggingEmployee = (value)=> {
    setState((state)=> ({...state, isLoggingEmployee: value}));
  }

  const setIsCreatingEmployee = (value)=> {
    setState((state)=> ({...state, isCreatingEmployee: value}));
  }

  const setIsUpdatingEmployee = (value)=> {
    setState((state)=> ({...state, isUpdatingEmployee: value}));
  }

  const setIsDeletingEmployee = (value)=> {
    setState((state)=> ({...state, isDeletingEmployee: value}));
  }

  const setIsGettingEmployee = (value)=> {
    setState((state)=> ({...state, isGettingEmployee: value}));
  }

  const setIsGettingEmployees = (value)=> {
    setState((state)=> ({...state, isGettingEmployees: value}));
  }

  const createListError = (error)=> {
    setState((state)=> {
      const errorId = generateId();
      
      const listError = {id: errorId, message: error ? error.message : ""};

      const employeeErrors = [...state.employeeErrors, listError];

      return {...state, employeeErrors};
    })
  }

  const deleteListError = (error)=> {
    setState((state)=> {
      const employeeErrors = state.employeeErrors.filter((listError)=> (
        !(listError.id === error.id)
      ));

      return {...state, employeeErrors};
    })
  }

  const createListEmployee = (employee)=> {
    setState((state)=> {
      const employees = [state.employees, employee];

      return {...state, employees};
    });
  }

  const deleteListEmployee = (employee)=> {
    setState((state)=> {
      const employees = state.employees.filter((listEmployee)=> (
        !(listEmployee.id === employee.id)
      ));

      return {...state, employees};
    });
  }

  const updateListEmployee = (employee)=> {
    setState((state)=> {
      const employees = state.employees.map((listEmployee)=> (
        listEmployee.id === employee.id ? ({...listEmployee, ...employee}) : listEmployee
      ));

      return {...state, employees};
    });
  }

  const setGettedEmployee = (employee)=> {
    setState((state)=> {
      return {...state, gettedEmployee: employee};
    });
  }

  const setEmployees = (employees)=> {
    setState((state)=> {
      return {...state, employees};
    });
  }

  return {
    state,
    resetStateEmployees,
    setIsLoggingEmployee,
    setIsCreatingEmployee,
    setIsUpdatingEmployee,
    setIsDeletingEmployee,
    setIsGettingEmployee,
    createListError,
    deleteListError,
    createListEmployee,
    deleteListEmployee,
    updateListEmployee,
    setGettedEmployee,
    setEmployees
  }
}
