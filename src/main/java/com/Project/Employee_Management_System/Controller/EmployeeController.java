package com.Project.Employee_Management_System.Controller;

import com.Project.Employee_Management_System.Entity.Employee;
import com.Project.Employee_Management_System.Services.EMPServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin
public class EmployeeController {

    private final EMPServices empServices;

    @GetMapping("/employee")
    public ResponseEntity<List<Employee>> getallEmp()
    {
        List<Employee> emp = empServices.getAllEmp();
        return ResponseEntity.ok(emp);
    }

    @GetMapping("employee/{name}")
    public ResponseEntity<Employee> getByUsername(@PathVariable String name) {
        Employee emp = empServices.getByName(name);

        if (emp != null) {
            return new ResponseEntity<>(emp, HttpStatus.FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("employee/addemp")
    public ResponseEntity<Employee> createEmp(@RequestBody Employee emp)
    {
        Employee newemp =empServices.addEmployee(emp);
        return new ResponseEntity<>(newemp,HttpStatus.CREATED);
    }

    @DeleteMapping("employee/{id}")
    public ResponseEntity<?> RemoveEmp(@PathVariable Long id)
    {
        Employee emp = empServices.RemoveEmploee(id);
        if(emp != null)
        {
            return ResponseEntity.ok(emp);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Employee not found with id: " + id);
        }
    }

    @PatchMapping("employee/{id}")
    public ResponseEntity<Employee> updateEmp(@PathVariable Long id,@RequestBody Employee empDetails)
    {
        Employee updatedEmp= empServices.UpdateEmployee(id,empDetails);
        if(updatedEmp != null)
        {
            return ResponseEntity.ok(updatedEmp);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();

        }
    }
}
