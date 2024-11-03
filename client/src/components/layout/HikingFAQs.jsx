import SectionHeaders from "./SectionHeaders"

export default function HikingFAQs() {
  return (
    <div className="py-6 px-20">
        <div className="text-center mb-4">
        <SectionHeaders
          subHeader={''}
          mainHeader={'Hiking FAQs'}  />
        </div>

       {/* Skill Levels Explained */}
       <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4 text-center">Skill Levels Explained – Day Hike</h2>
                <table className="min-w-full bg-gray-200">
                    <thead>
                        <tr className="bg-gray-300 text-left">
                            <th className="py-2 px-4">Image</th>
                            <th className="py-2 px-4">Classification</th>
                            <th className="py-2 px-4">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Beginner Row */}
                        <tr className="border-b">
                            <td className="py-2 px-4 text-center">
                                <img src="/beginner.png" alt="Beginner" width={100} height={100} className="rounded-lg" />
                            </td>
                            <td className="py-2 px-4">Beginner</td>
                            <td className="py-2 px-4">
                                These hiking destinations are great entry points for first-time hikers and training climbs for beginners. 
                                Going on day hikes through these trails are good opportunities to totally immerse yourself in nature and explore mountain hiking in the Philippines at a leisurely pace.
                            </td>
                        </tr>

                        {/* Intermediate Row */}
                        <tr className="border-b">
                            <td className="py-2 px-4 text-center">
                                <img src="/intermediate.png" alt="Intermediate" width={100} height={100} className="rounded-lg" />
                            </td>
                            <td className="py-2 px-4">Intermediate</td>
                            <td className="py-2 px-4">
                                If you’re an experienced hiker looking for a quick but challenging hike, these 5/9 day hikes are for you. 
                                Similarly, if you’re a beginner, not a first-timer, looking for a practice climb for an upcoming major hike, 
                                these moderately difficult day hikes should help you get into shape.
                            </td>
                        </tr>

                        {/* Advanced Row */}
                        <tr className="border-b">
                            <td className="py-2 px-4 text-center">
                                <img src="/advanced.png" alt="Advanced" width={100} height={100} className="rounded-lg" />
                            </td>
                            <td className="py-2 px-4">Advanced</td>
                            <td className="py-2 px-4">
                                If you’re an advanced hiker looking for the next challenging summit to conquer, 
                                these Philippine mountains belong on your hiking bucket list. 
                                These mountains have earned a certain level of fear even among the most veteran hikers. 
                                These mountains test the toughest of climbers even after intense physical training and mental preparation.
                            </td>
                        </tr>

                        {/* + Rating Row */}
                        <tr className="border-b">
                            <td className="py-2 px-4 text-center">
                                <img src="/plus-rating.png" alt="+ Rating" width={100} height={100} className="rounded-lg" />
                            </td>
                            <td className="py-2 px-4">+ Rating</td>
                            <td className="py-2 px-4">
                                The ‘+’ symbol next to a difficulty rating signifies an added degree of difficulty. 
                                The factors that necessitate this additional rating vary from hike to hike but generally include: 
                                slightly longer hiking distances, greater elevation change, and short sections of trail that present more challenging conditions than the majority of the rest of the trip.
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>

        {/* Trail Difficulty and Classification */}
        <div>
        <h2 className="text-2xl font-bold mb-4 text-center">Trail Difficulty and Classification</h2>
        {/* Three Cards in a Row */}
            
        </div>
    </div>
  )
}
