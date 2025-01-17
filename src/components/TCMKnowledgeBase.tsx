import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { tcmService } from "@/services/tcm";
import { useToast } from "@/components/ui/use-toast";

const TCMKnowledgeBase = () => {
  const [indexText, setIndexText] = useState("");
  const [indexTitle, setIndexTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleIndex = async () => {
    if (!indexText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to index",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await tcmService.indexText(indexText, indexTitle);
      toast({
        title: "Success",
        description: "Text indexed successfully",
      });
      setIndexText("");
      setIndexTitle("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to index text",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await tcmService.queryText(searchQuery);
      setSearchResults(data.results);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search knowledge base",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-tcm-accent mb-6">TCM Knowledge Base</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Add to Knowledge Base</h3>
        <div className="space-y-4">
          <Input
            placeholder="Title (optional)"
            value={indexTitle}
            onChange={(e) => setIndexTitle(e.target.value)}
          />
          <Textarea
            placeholder="Enter text to index..."
            value={indexText}
            onChange={(e) => setIndexText(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleIndex}
            disabled={isLoading}
            className="w-full bg-tcm-primary hover:bg-tcm-primary/90"
          >
            {isLoading ? "Indexing..." : "Index Text"}
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Search Knowledge Base</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-tcm-accent hover:bg-tcm-accent/90"
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-4 space-y-4">
              <h4 className="font-semibold">Search Results:</h4>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  {result.title && (
                    <h5 className="font-semibold text-tcm-accent">{result.title}</h5>
                  )}
                  <p className="mt-2 text-gray-700">{result.text}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Relevance: {(result._additional.certainty * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TCMKnowledgeBase;