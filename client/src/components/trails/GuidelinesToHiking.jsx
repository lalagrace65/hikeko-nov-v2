import { Typography, Card, CardBody } from '@material-tailwind/react';
import React from 'react';
import { FaTree, FaRecycle, FaCampground, FaDog, FaHandsHelping } from 'react-icons/fa';
import { GiTrail, GiWaterDrop, GiTakeMyMoney } from 'react-icons/gi';
import { MdVolumeOff } from 'react-icons/md';

export default function GuidelinesToHiking() {
  return (
    <Card className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-lg">
      <CardBody>
        <Typography variant="h5" className="font-bold text-center mb-6">
          🌄 Guidelines to Hiking 🌄
        </Typography>
        
        <div className="space-">
          <Typography variant="paragraph" className="flex items-center">
            <GiTakeMyMoney className="mr-2 width-5  text-green-600" /> 
            1. Registration at the Barangay Hall / Tourism Reception Desk is required. Fees are to be transacted at the same office.
          </Typography>
          <Typography variant="paragraph" className="flex items-center">
            <GiTrail className="mr-2 width-5   text-green-600" />
            2. Stick to the trail. Do not enter grass fields or trample on wild flowers.
          </Typography>
          <Typography variant="paragraph" className="flex items-center">
            <FaTree className="mr-2 width-5   text-green-600" />
            3. Do not pick any plants. Catching insects or animals is also prohibited. Be environmentally aware and avoid damaging any flora or fauna.
          </Typography>
          <Typography variant="paragraph" className="flex items-center">
            <FaRecycle className="mr-2 width-5   text-green-600" />
            4. Do not litter. Take all waste with you, and if you find any left by others, be the better person and take it with you.
          </Typography>
          <Typography variant="paragraph" className="flex items-center">
            <GiWaterDrop className="mr-2 width-5   text-green-600" />
            5. Use soap or detergent at least 100 meters from any water source. Choose biodegradable products.
          </Typography>
          <Typography variant="paragraph" className="flex items-center">
            <GiTrail className="mr-2 width-5   text-green-600" />
            6. Stay on the trails to avoid disturbing nature and minimize the risk of getting lost.
          </Typography>
          <Typography variant="paragraph" className="flex items-center">
            <FaHandsHelping className="mr-2 width-5   text-green-600" />
            7. Report any trail or sign damage to local authorities (e.g., Tourism Office, Barangay Chair).
          </Typography>
          <Typography variant="paragraph" className="flex items-center">
            <MdVolumeOff className="mr-2 width-5   text-green-600" />
            8. Avoid loud noises or music. People come to nature for its peace.
          </Typography>
          <Typography variant="paragraph" className="flex items-center">
            <FaCampground className="mr-2 width-5   text-green-600" />
            9. If camping, follow local regulations. Cooking is allowed only at the base camp and prohibited along the trail or at the summit.
          </Typography>
          <Typography variant="paragraph" className="flex items-center">
            <FaDog className="mr-2   text-green-600" />
            10. Fishing and hunting are not allowed. Pets are not permitted during the climb; you may leave them at the barangay hall for a small fee.
          </Typography>
          <Typography variant="paragraph" className="flex items-center">
            <FaRecycle className="mr-2  text-green-600" />
            11. Practice Leave No Trace (LNT): Take nothing but pictures, leave nothing but footprints, kill nothing but time.
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}
