package com.Project.Employee_Management_System.Entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Employee_information")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String department;
    private Double salary;

}
