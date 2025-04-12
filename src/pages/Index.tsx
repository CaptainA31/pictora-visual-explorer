
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Image, PenSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

// Mock images for the examples
const mockExamples = [
  {
    id: 'example1',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=500&auto=format&fit=crop',
    title: 'Eiffel Tower',
    type: 'landmark',
  },
  {
    id: 'example2',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=500&auto=format&fit=crop',
    title: 'Red-eyed Tree Frog',
    type: 'animal',
  },
  {
    id: 'example3',
    image: 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?q=80&w=500&auto=format&fit=crop',
    title: 'Colosseum',
    type: 'landmark',
  },
  {
    id: 'example4',
    image: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=500&auto=format&fit=crop',
    title: 'Fox',
    type: 'animal',
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      navigate('/results', { 
        state: { 
          imageUrl: URL.createObjectURL(file),
          searchType: 'image' 
        } 
      });
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // Hidden file input
  const hiddenFileInput = (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="hidden"
    />
  );

  return (
    <div className="container px-4 py-8 md:py-12 mx-auto">
      <section className="flex flex-col items-center text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-pictora-teal mb-4"
        >
          Where Every Image <br className="md:hidden" />
          <span className="text-pictora-coral">Tells a Story</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-pictora-teal/80 max-w-2xl mb-8"
        >
          Discover landmarks and wildlife through our AI-powered visual explorer. 
          Simply upload an image or describe what you're looking for in text.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
        >
          <Button 
            onClick={handleCameraClick}
            className="flex-1 bg-pictora-teal hover:bg-pictora-lightTeal text-white h-16 text-lg"
          >
            <Camera className="mr-2 h-5 w-5" /> Upload Image
          </Button>
          
          <Button 
            onClick={() => navigate('/text-search')}
            variant="outline" 
            className="flex-1 border-pictora-teal text-pictora-teal hover:bg-pictora-teal/10 h-16 text-lg"
          >
            <PenSquare className="mr-2 h-5 w-5" /> Text Search
          </Button>
          
          {hiddenFileInput}
        </motion.div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold text-pictora-teal">Explore Examples</h2>
          <div className="flex items-center text-pictora-coral">
            <Sparkles className="mr-2 h-5 w-5" />
            <span className="hidden sm:inline font-medium">AI-Powered Recognition</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockExamples.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="overflow-hidden border-pictora-teal/20 hover:border-pictora-teal/50 transition-all">
                <CardContent className="p-0">
                  <div className="image-container">
                    <img 
                      src={example.image} 
                      alt={example.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-playfair font-semibold text-lg text-pictora-teal">{example.title}</h3>
                    <p className="text-sm text-pictora-teal/70 capitalize">{example.type}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-pictora-lightTeal/10 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-pictora-teal mb-4">How Pictora.ai Works</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-pictora-teal rounded-full p-1 mr-3 mt-1">
                  <Camera className="h-4 w-4 text-white" />
                </div>
                <p className="text-pictora-teal/90">Upload an image of a landmark or animal you'd like to identify</p>
              </li>
              <li className="flex items-start">
                <div className="bg-pictora-teal rounded-full p-1 mr-3 mt-1">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <p className="text-pictora-teal/90">Our AI analyzes the visual features to identify what you're looking at</p>
              </li>
              <li className="flex items-start">
                <div className="bg-pictora-teal rounded-full p-1 mr-3 mt-1">
                  <Image className="h-4 w-4 text-white" />
                </div>
                <p className="text-pictora-teal/90">Get detailed information and discover similar images</p>
              </li>
            </ul>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-pictora-teal/20 rotate-3">
              <img
                src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=500&auto=format&fit=crop"
                alt="Colosseum example"
                className="w-full h-auto rounded-lg mb-3"
              />
              <div className="py-2">
                <h4 className="font-playfair font-bold text-pictora-teal">Colosseum</h4>
                <p className="text-xs text-pictora-teal/70">Historic amphitheater in Rome, Italy</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
