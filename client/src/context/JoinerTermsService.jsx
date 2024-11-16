import React from "react";
import { 
    Dialog, 
    DialogHeader, 
    DialogBody, 
    DialogFooter, 
    Button 
} from "@material-tailwind/react";

export default function JoinerTermsService({ open, onClose }) {
  return (
    <Dialog open={open} handler={onClose} className="max-w-4xl">
      <DialogHeader className="text-lg font-bold text-center">
        Hikeko Terms of Service and Conditions for Joiners
      </DialogHeader>
      <DialogBody className="h-96 overflow-y-auto space-y-4 text-justify">
        <p>
          By participating in any Hikeko hiking activity or booking through our travel and tour partners, 
          you agree to the following terms and conditions. Please read carefully before confirming your booking 
          or participating in any of our hiking activities.
        </p>
        <div>
          <h3 className="font-semibold">1. Age Requirement</h3>
          <ul className="list-disc list-inside pl-4">
            <li>You must be 18 years or older to participate in any Hikeko hiking activity.</li>
            <li>If you are under 18, you must submit a signed letter of consent from a parent or guardian to join any of our hikes.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">2. Assumption of Risk</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Participation in any hiking activity involves inherent risks, including but not limited to injury, death, loss, or damage to personal property. By participating, you acknowledge and assume these risks.</li>
            <li>Hikeko is not liable for any injuries, accidents, or damages sustained during any hiking activities.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">3. Participant Responsibility</h3>
          <ul className="list-disc list-inside pl-4">
            <li>You are responsible for your own safety and well-being during the hike. Make sure to assess your physical capabilities and understand the risks associated with the activity.</li>
            <li>It is your responsibility to bring appropriate clothing, gear, and personal equipment suited for the hike.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">4. Insurance and Liability</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Hikeko does not provide accident or health insurance unless explicitly stated in the trip package. Participants are encouraged to have their own personal insurance.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">5. Payments and Bookings</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Domestic Hikes: A 60% down payment or full payment is required to confirm your reservation. You have 3 days after booking to complete this payment.</li>
            <li>Failure to meet the payment deadlines may result in forfeiture of your reservation. Extensions may be granted if requested via email.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">6. Cancellation and Refund Policy</h3>
          <ul className="list-disc list-inside pl-4">
            <li>1 month or more before the hike: Full refund.</li>
            <li>30 to 15 days before the hike: Php 500 cancellation fee.</li>
            <li>14 to 7 days before the hike: Php 1,000 cancellation fee.</li>
            <li>6 to 3 days before the hike: Php 1,500 cancellation fee.</li>
            <li>2 days or less before the hike: No refund.</li>
          </ul>
          <p className="mt-2 text-sm">
            <span className="font-semibold">Important Note:</span> Cancellation requests must be made via email. Text messages or phone calls will not be honored. Any cancellation received after 5 pm local time will be processed the next business day.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">7. Transfers and Replacements</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Your reservation is transferable. If you are unable to participate, you can find a replacement for the same hike. Hikeko will waive any cancellation fees if a replacement is provided. However, replacements must be arranged in advance, and Hikeko should be notified immediately.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">8. Trip Cancellations by Hikeko</h3>
          <ul className="list-disc list-inside pl-4">
            <li>If Hikeko cancels a trip due to insufficient participants or other reasons, a full refund will be provided.</li>
            <li>In the event of cancellation due to weather, natural disasters, or other force majeure events, a 10% cancellation fee may be charged to cover costs incurred. 
                These cancellations may occur even close to the hike date.
            </li>
            <li>If a trip is aborted once it has commenced due to weather or unforeseen risks, participants agree to share any additional costs incurred.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">9. Media Consent</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Hikeko may capture photos or videos during hikes for promotional purposes. By participating, you consent to appear in such media.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">10. Fair Weather Policy</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Once a hike has started, if adverse weather or other risks force the group to abandon the hike, participants agree to share any additional expenses incurred.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">11. Privacy and Data Protection</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Hikeko values your privacy and will only collect and use personal information necessary to deliver our services. Your data will be stored securely and will not 
                be shared with third parties except for trusted partners who help in providing our services.</li>
          </ul>
        </div>
        <div>
        <span>By continuing with your booking and participation, you agree to comply with these terms of services and conditions.</span>
        </div>
      </DialogBody>
      <DialogFooter className="justify-end">
        <Button variant="text" color="red" onClick={onClose} className="mr-2">
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={onClose}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
