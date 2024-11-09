import { GeneralQuestion } from "./GeneralQuestion"
import SectionHeaders from "./SectionHeaders"

export default function HikingFAQs() {
  return (
    <div className="">
        <div className="py-6 mt-10">
        <div className="text-center mb-4">
        <SectionHeaders
          subHeader={''}
          mainHeader={'Hiking FAQs'}  />
        </div>

        <div>
            <GeneralQuestion />
        </div>

        {/* Trail Difficulty and Classification */}
        <div className="mt-10 mb-4">
            <h2 className="text-2xl font-bold mb-2">Trail Difficulty and Classification</h2>
                <h3 className="font-bold mb-1"> Why are hiking difficulties ranked from 1-9?</h3>
                <p className="text-gray-800">Most hiking difficulty ratings use a scale of 1-9 to indicate the level of challenge involved. 
                    A rating of 1 is typically for easy trails suitable for beginners, while a rating of 9 is for extremely difficult trails requiring advanced skills and physical fitness. 
                    Factors considered in difficulty ratings include elevation gain, terrain, trail conditions, and exposure to hazards.</p>
            
            {/* Three Cards in a Row */}         
        </div>        

       {/* Skill Levels Explained */}
       <div className="mt-10 ">
                <h2 className="text-2xl font-bold mb-4">Skill Levels Explained – Day Hike</h2>
                <table className="min-w-full bg-gray-200 ">
                    <thead>
                        <tr className="bg-trColor text-left">
                            <th className="py-2 px-4">Classification</th>
                            <th className="py-2 px-4">Details</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 bg-tdColor">
                        {/* Beginner Row */}
                        <tr className="border-b">
                            <td className="py-2 px-4">Beginner</td>
                            <td className="py-2 px-4">
                                These hiking destinations are great entry points for first-time hikers and training climbs for beginners. 
                                Going on day hikes through these trails are good opportunities to totally immerse yourself in nature and explore mountain hiking in the Philippines at a leisurely pace.
                            </td>
                        </tr>

                        {/* Intermediate Row */}
                        <tr className="border-b">
                            <td className="py-2 px-4">Intermediate</td>
                            <td className="py-2 px-4">
                                If you’re an experienced hiker looking for a quick but challenging hike, these 5/9 day hikes are for you. 
                                Similarly, if you’re a beginner, not a first-timer, looking for a practice climb for an upcoming major hike, 
                                these moderately difficult day hikes should help you get into shape.
                            </td>
                        </tr>

                        {/* Advanced Row */}
                        <tr className="border-b">
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
    </div>
    </div>
    
  )
}
