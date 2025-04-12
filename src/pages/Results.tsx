
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Mock Data for demonstration
const mockLandmarkResult = {
  name: "Eiffel Tower",
  location: "Paris, France",
  type: "landmark",
  description: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower from 1887 to 1889 as the entrance to the 1889 World's Fair.",
  history: "Completed in 1889 as the entrance to the 1889 World's Fair, it was initially criticized by some of France's leading artists and intellectuals for its design, but it has become a global cultural icon of France and one of the most recognizable structures in the world.",
  significance: "At 330 meters (1,083 ft) tall, the Eiffel Tower was the tallest man-made structure in the world for 41 years until the Chrysler Building in New York City was finished in 1930.",
  facts: [
    "The tower is 330 meters (1,083 ft) tall",
    "It weighs 10,100 tonnes",
    "The tower has three levels for visitors",
    "It attracts about 7 million visitors annually"
  ],
  similarImages: [
    "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?q=80&w=400&auto=format&fit=crop",
  ]
};

const mockAnimalResult = {
  name: "Red Fox (Vulpes vulpes)",
  location: "Northern Hemisphere",
  type: "animal",
  description: "The red fox is the largest of the true foxes and one of the most widely distributed members of the order Carnivora, being present across the entire Northern Hemisphere including most of North America, Europe and Asia, plus parts of North Africa.",
  habitat: "Red foxes are adaptable and live in a wide range of habitats including forests, grasslands, mountains, and human environments such as farms, suburban areas, and even cities.",
  diet: "Red foxes are omnivores with a highly varied diet. They primarily eat small rodents like mice, but also consume rabbits, birds, eggs, insects, earthworms, fruits, and berries.",
  facts: [
    "Red foxes have excellent hearing and can detect sounds of rodents digging underground",
    "They can run up to 30 mph (48 km/h)",
    "A group of foxes is called a 'skulk' or 'leash'",
    "They have whiskers on their legs as well as their muzzles to help navigate"
  ],
  similarImages: [
    "https://images.unsplash.com/photo-1520561805070-83c413349512?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615824996195-f780bba7cfab?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588167056547-c183313da47c?q=80&w=400&auto=format&fit=crop",
  ]
};

// Type definitions for props
interface LocationState {
  imageUrl?: string;
  searchQuery?: string;
  searchType: 'image' | 'text';
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const state = location.state as LocationState;

  // For demo purposes, we'll randomly select between landmark and animal result
  useEffect(() => {
    if (!state) {
      navigate('/');
      return;
    }

    // Simulate API call
    const timer = setTimeout(() => {
      // For demo purposes, randomly choose between landmark and animal result
      const mockResult = Math.random() > 0.5 ? mockLandmarkResult : mockAnimalResult;
      setResult(mockResult);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [state, navigate]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!state) {
    return null; // This will redirect via the useEffect
  }

  return (
    <div className="container px-4 py-8 max-w-5xl mx-auto">
      <Button
        variant="outline"
        className="mb-6 border-pictora-teal/30 text-pictora-teal"
        onClick={handleGoBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main Image Column */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            {isLoading ? (
              <Skeleton className="w-full aspect-[3/4] rounded-xl" />
            ) : (
              <div className="overflow-hidden rounded-xl border border-pictora-teal/20">
                {state.imageUrl ? (
                  <img
                    src={state.imageUrl}
                    alt="Uploaded content"
                    className="w-full aspect-[3/4] object-cover"
                  />
                ) : (
                  <img
                    src={result.type === 'landmark' 
                      ? "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=800&auto=format&fit=crop" 
                      : "https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=800&auto=format&fit=crop"}
                    alt={result.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                )}
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center text-pictora-teal/70">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="text-sm">AI-Powered Recognition</span>
              </div>
              <Button
                variant="ghost"
                className="text-pictora-teal"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>

        {/* Information Column */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <div className="pt-4">
                <Skeleton className="h-8 w-52 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-pictora-teal font-playfair mb-2">
                {result.name}
              </h1>
              <p className="text-pictora-teal/70 text-lg mb-6">{result.location}</p>
              
              <p className="text-pictora-teal/90 text-lg mb-6">
                {result.description}
              </p>
              
              <Tabs defaultValue="details" className="mb-8">
                <TabsList className="bg-pictora-teal/10 text-pictora-teal">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  {result.type === 'landmark' ? (
                    <TabsTrigger value="history">History</TabsTrigger>
                  ) : (
                    <TabsTrigger value="habitat">Habitat & Diet</TabsTrigger>
                  )}
                  <TabsTrigger value="facts">Quick Facts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="mt-4">
                  <div className="bg-pictora-lightTeal/5 border border-pictora-teal/10 rounded-lg p-4">
                    {result.type === 'landmark' ? (
                      <p className="text-pictora-teal/90">{result.significance}</p>
                    ) : (
                      <p className="text-pictora-teal/90">{result.description}</p>
                    )}
                    
                    <Button 
                      variant="link" 
                      className="text-pictora-coral p-0 mt-2 font-medium flex items-center"
                    >
                      <BookOpen className="mr-1 h-4 w-4" /> Read more
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value={result.type === 'landmark' ? 'history' : 'habitat'} className="mt-4">
                  <div className="bg-pictora-lightTeal/5 border border-pictora-teal/10 rounded-lg p-4">
                    {result.type === 'landmark' ? (
                      <p className="text-pictora-teal/90">{result.history}</p>
                    ) : (
                      <>
                        <h3 className="font-medium text-pictora-teal mb-2">Habitat</h3>
                        <p className="text-pictora-teal/90 mb-4">{result.habitat}</p>
                        <h3 className="font-medium text-pictora-teal mb-2">Diet</h3>
                        <p className="text-pictora-teal/90">{result.diet}</p>
                      </>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="facts" className="mt-4">
                  <div className="bg-pictora-lightTeal/5 border border-pictora-teal/10 rounded-lg p-4">
                    <ul className="space-y-2">
                      {result.facts.map((fact: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block h-2 w-2 rounded-full bg-pictora-coral mr-2 mt-2"></span>
                          <span className="text-pictora-teal/90">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
              
              <h3 className="text-xl font-semibold text-pictora-teal font-playfair mb-4">Similar {result.type === 'landmark' ? 'Landmarks' : 'Animals'}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {result.similarImages.map((image: string, index: number) => (
                  <div key={index} className="image-container">
                    <img
                      src={image}
                      alt={`Similar ${result.type} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button className="bg-pictora-coral hover:bg-pictora-coral/80 text-white">
                  Explore More {result.type === 'landmark' ? 'Landmarks' : 'Animals'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
