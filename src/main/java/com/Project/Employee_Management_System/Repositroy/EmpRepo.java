package com.Project.Employee_Management_System.Repositroy;

import com.Project.Employee_Management_System.Entity.Employee;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EmpRepo extends JpaRepository<Employee,Long> {
     Employee findByName(String name);
}
