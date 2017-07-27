require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');

function generatePatient() {
  const patient = {
    name: 'Jorge Padilla',
    identification: '0105085740',
    birth_date: '1990-02-21',
    birth_place: 'Cuenca',
    gender: 'Masculino',
    status: 'Soltero',
    blood_type: 'A+',
    location: {
      address: 'Challuabamba',
      city: 'Cuenca',
    },
    phone: '0999281526',
    email: 'jorge.esteban.padilla@gmail.com',
    job: 'Ingeniero de sistemas',
    pathological_record: '',
    family_pathological_record: '',
  };

  return patient;
}

const patients = [];
for (let i = 100; i > 0; i--) {
  patients.push(generatePatient());
}

fs.writeFileSync(__dirname + '/patients.json', JSON.stringify(patients), 'utf-8');
console.log('👍👍👍👍👍👍👍👍 Done!');
