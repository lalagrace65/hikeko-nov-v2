import React from "react";
import { 
    Dialog, 
    DialogHeader, 
    DialogBody, 
    DialogFooter, 
    Button } 
from "@material-tailwind/react";

export default function JoinerTermsService({ open, onClose }) {
  return (
    <Dialog open={open} handler={onClose}>
        <DialogHeader>Terms and Conditions</DialogHeader>
        <DialogBody>
            The key to more success is to have a lot of pillows. Put it this way,
            it took me twenty-five years to get these plants, twenty-five years of
            blood, sweat, and tears, and I'm never giving up, I'm just
            getting started. I'm up to something. Fan love.
        </DialogBody>
        <DialogFooter>
            <Button variant="text" color="red" onClick={onClose} className="mr-1">
                <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={onClose}>
                <span>Confirm</span>
            </Button>
        </DialogFooter>
    </Dialog>
  )
}
