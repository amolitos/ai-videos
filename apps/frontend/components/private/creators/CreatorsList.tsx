import Link from "next/link";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Plus } from "lucide-react";
import { Creator } from "@/lib/models";
import { apiService } from "@/lib/api-service";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const CreatorsList = async () => {
  const creators = await apiService.get<Creator[]>("/creators");

  return (
    <>
      <h2 className="font-bold text-2xl mb-8">Creadores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Item variant="outline" asChild>
          <Link href="creators/new">
            <ItemContent>
              <ItemTitle>NUEVO CREADOR</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Plus className="size-4" />
            </ItemActions>
          </Link>
        </Item>
        {creators.map((creator) => (
          <Item key={creator.id} variant="outline" asChild>
            <Link href={`creators/${creator.id}`}>
              <ItemMedia>
                <Avatar className="size-10">
                  <AvatarFallback>
                    {creator.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{creator.name}</ItemTitle>
                <ItemDescription>{creator.created_at}</ItemDescription>
              </ItemContent>
              <ItemActions />
            </Link>
          </Item>
        ))}
      </div>
    </>
  );
};
