export default function Packages({ selected, onChange }) {
    function handleCbClick(ev) {
        const { checked, name } = ev.target;
        if (checked) {
            onChange([...selected, name]); // Add new item to selected array
        } else {
            onChange(selected.filter(selectedName => selectedName !== name)); // Remove item from selected array
        }
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            <label className="flex border rounded-2xl p-4 items-center gap-2 cursor-pointer">
                <input type="checkbox" name="vanTransfer" checked={selected.includes('vanTransfer')} onChange={handleCbClick} />
                <span>Van transfer</span>
            </label>
            <label className="flex border rounded-2xl p-4 items-center gap-2 cursor-pointer">
                <input type="checkbox" name="registrationFee" checked={selected.includes('registrationFee')} onChange={handleCbClick} />
                <span>Registration fee</span>
            </label>
            <label className="flex border rounded-2xl p-4 items-center gap-2 cursor-pointer">
                <input type="checkbox" name="coordinatorFee" checked={selected.includes('coordinatorFee')} onChange={handleCbClick} />
                <span>Coordinator's fee</span>
            </label>
            <label className="flex border rounded-2xl p-4 items-center gap-2 cursor-pointer">
                <input type="checkbox" name="tourGuideFee" checked={selected.includes('tourGuideFee')} onChange={handleCbClick} />
                <span>Tour guide fee</span>
            </label>
            <label className="flex border rounded-2xl p-4 items-center gap-2 cursor-pointer">
                <input type="checkbox" name="environmentalFee" checked={selected.includes('environmentalFee')} onChange={handleCbClick} />
                <span>Environmental fee</span>
            </label>
            <label className="flex border rounded-2xl p-4 items-center gap-2 cursor-pointer">
                <input type="checkbox" name="parkingFee" checked={selected.includes('parkingFee')} onChange={handleCbClick} />
                <span>Parking fee</span>
            </label>
            <label className="flex border rounded-2xl p-4 items-center gap-2 cursor-pointer">
                <input type="checkbox" name="bagTag" checked={selected.includes('bagTag')} onChange={handleCbClick} />
                <span>Bag tag</span>
            </label>
            <label className="flex border rounded-2xl p-4 items-center gap-2 cursor-pointer">
                <input type="checkbox" name="driverFee" checked={selected.includes('driverFee')} onChange={handleCbClick} />
                <span>Driver's fee</span>
            </label>
            <label className="flex border rounded-2xl p-4 items-center gap-2 cursor-pointer">
                <input type="checkbox" name="droneService" checked={selected.includes('droneService')} onChange={handleCbClick} />
                <span>Drone Shot Service</span>
            </label>
        </div>
    );
}
