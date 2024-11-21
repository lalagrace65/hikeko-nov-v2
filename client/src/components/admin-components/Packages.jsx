export default function Packages({ selected, onChange, disabled }) {
    function handleCbClick(ev) {
        const { checked, name } = ev.target;
        if (disabled) return; // Prevent interaction if disabled
        if (checked) {
            onChange([...selected, name]); // Add new item to selected array
        } else {
            onChange(selected.filter(selectedName => selectedName !== name)); // Remove item from selected array
        }
    }

    const options = [
        { name: 'vanTransfer', label: 'Van transfer' },
        { name: 'registrationFee', label: 'Registration fee' },
        { name: 'coordinatorFee', label: "Coordinator's fee" },
        { name: 'tourGuideFee', label: 'Tour guide fee' },
        { name: 'environmentalFee', label: 'Environmental fee' },
        { name: 'parkingFee', label: 'Parking fee' },
        { name: 'bagTag', label: 'Bag tag' },
        { name: 'driverFee', label: "Driver's fee" },
        { name: 'droneService', label: 'Drone Shot Service' },
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {options.map(option => (
                <label
                    key={option.name}
                    className={`flex border rounded-2xl p-4 items-center gap-2 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    <input
                        type="checkbox"
                        name={option.name}
                        checked={selected.includes(option.name)}
                        onChange={handleCbClick}
                        disabled={disabled} // Disable checkbox if in edit mode
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    );
}
