package com.Project.Employee_Management_System.Services;

import com.Project.Employee_Management_System.Entity.Employee;
import com.Project.Employee_Management_System.Repositroy.EmpRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EMPServices {
    private final EmpRepo empRepo;

    public List<Employee> getAllEmp() {
        return empRepo.findAll();
    }

    public Employee getByName(String name) {
       return empRepo.findByName(name);
    }

    public Employee addEmployee(Employee emp) {
        return empRepo.save(emp);
    }

    public Employee RemoveEmploee(Long id) {
        Optional<Employee> emp = empRepo.findById(id);
        if (emp.isPresent())
        {
            Employee removeEmp= emp.get();
            empRepo.deleteById(id);
            return  removeEmp;
        }else {
            return null;
        }


    }

    public Employee UpdateEmployee(Long id, Employee empDetails) {
        Employee old = empRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Employee not found with id: " + id
                ));
        if (empDetails.getName() != null)
        {
            old.setName(empDetails.getName());
        }
        if(empDetails.getDepartment() != null)
        {
            old.setDepartment(empDetails.getDepartment());
        }
        if(empDetails.getSalary() != null)
        {
            old.setSalary(empDetails.getSalary());
        }
        return empRepo.save(old);

    }
}