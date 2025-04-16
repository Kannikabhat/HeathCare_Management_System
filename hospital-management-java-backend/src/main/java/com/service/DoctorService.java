// // package com.service;

// // import com.dto.DoctorDTO;
// // import org.springframework.http.ResponseEntity;
// // import java.util.List;

// // public interface DoctorService {
// //     ResponseEntity<String> createDoctor(DoctorDTO doctorDTO);
// //     ResponseEntity<List<DoctorDTO>> getAllDoctors();
// //     ResponseEntity<DoctorDTO> getDoctorById(int id);
// //     ResponseEntity<String> updateDoctor(int id, DoctorDTO doctorDTO);
// //     ResponseEntity<String> deleteDoctor(int id);
// // }
// package com.service;

// import com.dto.DoctorDTO;
// import org.springframework.http.ResponseEntity;
// import java.util.List;

// public interface DoctorService {
//     ResponseEntity<String> createDoctor(DoctorDTO doctorDTO);
//     ResponseEntity<List<DoctorDTO>> getAllDoctors();
//     ResponseEntity<DoctorDTO> getDoctorById(int id);  // Change to int
//     ResponseEntity<String> updateDoctor(int id, DoctorDTO doctorDTO);  // Change to int
//     ResponseEntity<String> deleteDoctor(int id);  // Change to int
// }

package com.service;

import com.dto.DoctorDTO;
import org.springframework.http.ResponseEntity;
import java.util.List;



public interface DoctorService {
    ResponseEntity<String> createDoctor(DoctorDTO dto);
    ResponseEntity<List<DoctorDTO>> getAllDoctors();
    ResponseEntity<DoctorDTO> getDoctorById(int id);  // Use int for doctorId
    ResponseEntity<String> updateDoctor(int id, DoctorDTO dto);  // Use int for doctorId
    ResponseEntity<String> deleteDoctor(int id);  // Use int for doctorId
}


