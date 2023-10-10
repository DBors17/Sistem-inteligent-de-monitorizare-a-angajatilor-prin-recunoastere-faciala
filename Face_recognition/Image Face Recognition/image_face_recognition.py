import cv2
import os
import sys
import face_recognition

param = sys.argv[1]

test_img = "C:/Users/Maria/Desktop/Sistem inteligent de monitorizare a angajatilor/Face_recognition/Foto_to_recognize/" + param
model_folder = "C:/Users/Maria/Desktop/Sistem inteligent de monitorizare a angajatilor/Face_recognition/Model"
# incarcam o imagine
original_image = cv2.imread(test_img)
original_image = cv2.resize(original_image, (0, 0), fx=0.5, fy=0.5)

known_face_encodings = []
known_face_names = []

# incarcam toate imaginile modelelor si codificam fețele
for filename in os.listdir(model_folder):
    if filename.endswith(".jpg") or filename.endswith(".jpeg"):
        model_img = os.path.join(model_folder, filename)
        model_image = face_recognition.load_image_file(model_img)
        face_encodings = face_recognition.face_encodings(model_image)
        if len(face_encodings) > 0:
            model_face_encodings = face_encodings[0]
        else:
            print(f"No face was detected in image {model_img}")
            continue
        known_face_encodings.append(model_face_encodings)
        
        # adaugam numele fisierelor in lista known_face_names
        known_face_names.append(filename.split('.')[0])

# incarcam imaginea pentru recunoastere
image_to_recognize = face_recognition.load_image_file(test_img)
image_to_recognize = cv2.resize(image_to_recognize, (0, 0), fx=0.5, fy=0.5)

# detectam toate fetele din imagine
all_face_locations = face_recognition.face_locations(image_to_recognize, model="yolo") 
all_face_encodings = face_recognition.face_encodings(image_to_recognize, all_face_locations)

# iteram prin toate fetele din imagine si le recunoastem
for current_face_location, current_face_encoding in zip(all_face_locations, all_face_encodings):
    
    all_matches = face_recognition.compare_faces(known_face_encodings, current_face_encoding)
    name_of_person = 'Unknown face'
    
    if True in all_matches:
        first_match_index = all_matches.index(True)
        name_of_person = known_face_names[first_match_index]
    
    print(name_of_person)


    
    