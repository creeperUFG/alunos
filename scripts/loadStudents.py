from csv import reader
import requests

with open('egressos.csv', 'r') as read_obj:
    csv_reader = reader(read_obj)
    for row in csv_reader:
        requests.post("http://localhost:3333/university/student/add", json={"city": str(row[0]), "course": str(row[1]), "courseType": str(row[2]), "courseGrau": str(row[3]), "shift": str(row[4]), "startYear": int(row[5]) if row[5] != '' else None, "typeOfEntry": str(
            row[6]).lower(), "globalScore": float(row[7]) if row[7] != '' else None, "courseGlobalScore": float(row[8]) if row[8] != '' else None, "status": str((row[9])), "endYear": int(row[10]) if row[10] != '' else None})
