import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { decompressFromEncodedURIComponent } from "lz-string";
import { useMobs } from "@/lib/useMobs";

export const Route = createFileRoute("/i/$data")({
  component: RouteComponent,
});

function RouteComponent() {
  const { create } = useMobs();
  const params = Route.useParams();
  const navigate = Route.useNavigate();
  const [error, setError] = useState<string | null>(null);

  const importFromUrl = useEffectEvent(() => {
    try {
      const jsonString = decompressFromEncodedURIComponent(params.data);
      const id = create(JSON.parse(jsonString));
      navigate({
        to: `/m/$id`,
        params: {
          id,
        },
      });
    } catch {
      setError("Something went wrong!");
    }
  });

  const hasImported = useRef(false);

  useEffect(() => {
    if (!hasImported.current) {
      hasImported.current = true;
      importFromUrl();
    }
  }, []);

  if (!error) {
    return <div>Import successful</div>;
  }

  return <div>{error}</div>;
}
