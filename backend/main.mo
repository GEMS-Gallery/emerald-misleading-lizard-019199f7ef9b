import Array "mo:base/Array";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor {
  // Types
  type Note = {
    id: Nat;
    title: Text;
    content: Text;
    category: ?Text;
  };

  // Stable variables
  stable var nextNoteId: Nat = 0;
  stable var categories: [Text] = [];
  stable var notes: [Note] = [];

  // Helper functions
  func findCategory(name: Text) : ?Nat {
    return Array.indexOf<Text>(name, categories, Text.equal);
  };

  func findNote(id: Nat) : ?Note {
    return Array.find<Note>(notes, func(note) { note.id == id });
  };

  // Category management
  public func addCategory(name: Text) : async Result.Result<(), Text> {
    switch (findCategory(name)) {
      case null {
        categories := Array.append<Text>(categories, [name]);
        #ok(())
      };
      case (?_) { #err("Category already exists") };
    }
  };

  public func removeCategory(name: Text) : async Result.Result<(), Text> {
    switch (findCategory(name)) {
      case null { #err("Category not found") };
      case (?index) {
        categories := Array.tabulate<Text>(categories.size() - 1, func(i) {
          if (i < index) { categories[i] } else { categories[i + 1] }
        });
        #ok(())
      };
    }
  };

  public query func getCategories() : async [Text] {
    categories
  };

  // Note management
  public func addNote(title: Text, content: Text, category: ?Text) : async Result.Result<(), Text> {
    let newNote = {
      id = nextNoteId;
      title = title;
      content = content;
      category = category;
    };
    notes := Array.append<Note>(notes, [newNote]);
    nextNoteId += 1;
    #ok(())
  };

  public func updateNote(id: Nat, title: Text, content: Text, category: ?Text) : async Result.Result<(), Text> {
    switch (findNote(id)) {
      case null { #err("Note not found") };
      case (?note) {
        let updatedNote = {
          id = note.id;
          title = title;
          content = content;
          category = category;
        };
        notes := Array.map<Note, Note>(notes, func(n) {
          if (n.id == id) { updatedNote } else { n }
        });
        #ok(())
      };
    }
  };

  public query func getNotes() : async [Note] {
    notes
  };
}
